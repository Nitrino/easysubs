import { type FC, useEffect, useState } from "react";
import { useGate, useUnit } from "effector-react";
import { $learningService, $translateLanguage } from "@src/models/settings";

import { $currentWordTranslation, $wordTranslationsPendings, WordTranslationsGate } from "@src/models/translations";
import toast from "react-hot-toast";
import { SoundIcon } from "./assets/SoundIcon";
import { PlusIcon } from "./assets/PlusIcon";
import { joinTranslations } from "@src/utils/joinTranslations";

import cambridgeIcon from "@assets/img/icons/cambridge.png";
import forvoIcon from "@assets/img/icons/forvo.png";
import urbandictionaryIcon from "@assets/img/icons/urbandictionary.png";
import youglishIcon from "@assets/img/icons/youglish.png";
import { type ILearningService } from "@src/learning-service/learningService";
import { type TWordTranslationItem } from "@src/models/types";
import { $subsLanguage } from "@src/models/subs";
import { getLearningService } from "@src/utils/getLearningService";
import { TranslateSelect } from "../ui/TranslateSelect";

// --- NEW: Audio Fallback Mechanism ---
const playAudioFallback = async (text: string, lang: string) => {
  if (lang === 'auto') throw new Error('playAudioFallback cannot detect language')

  console.log("[TTS] Requesting fallback via background for:", lang);
  try {
    let targetLang = lang;

    if (!targetLang || targetLang === "auto") {
      try {
        console.log("[TTS] Language is 'auto', requesting detection...");
        // Use the existing getTextLanguage message handler in background
        const detected = await chrome.runtime.sendMessage({
          type: "getTextLanguage",
          text,
          language: "en", // default param required by the fetcher signature
        });

        // Ensure we get a string back (detected might be "km" or { lang: "km" } depending on fetcher)
        targetLang = (typeof detected === "string" ? detected : detected?.lang) || "en";
        console.log("[TTS] Resolved 'auto' to:", targetLang);
      } catch (detectErr) {
        console.warn("[TTS] Detection failed, defaulting to en", detectErr);
        targetLang = "en";
      }
    }

    // We send a message to the background script to fetch the audio blob.
    // This bypasses CORS and 'Blocked by Client' errors in the content script.
    const response = await chrome.runtime.sendMessage({
      type: "fetchTTS",
      lang: targetLang,
      text,
    });

    if (response && response.audioData) {
      const audio = new Audio(response.audioData);
      audio.play();
    } else {
      throw new Error(response?.error || "No audio data received from background");
    }
  } catch (e) {
    console.error("[TTS] Background fallback failed", e);
    toast.error("Audio playback failed.");
  }
};

const handlePlaySound = (text: string, lang: string) => {
  if (lang === 'auto') throw new Error('handlePlaySound cannot detect language')

  window.speechSynthesis.cancel(); // Stop any pending speech

  const voices = window.speechSynthesis.getVoices();
  // Check if we actually have a voice for this language
  // We look for a partial match (e.g., 'es' matches 'es-ES' or 'es-MX')
  const hasVoice = voices.some((v) => v.lang.startsWith(lang));

  console.log("[TTS Debug]", {
    text,
    lang,
    hasLocalVoice: hasVoice,
  });

  const isLinux = navigator.userAgent.toLowerCase().includes("linux");

  // If we don't have a local voice (or lang is 'auto'), or we are on Linux (often buggy), use fallback
  if (!hasVoice || isLinux || lang === "auto") {
    playAudioFallback(text, lang);
    return;
  }

  // Try standard Browser TTS
  const msg = new SpeechSynthesisUtterance();
  msg.text = text;
  msg.lang = lang;
  msg.rate = 0.8;

  msg.onerror = (e) => {
    console.error("[TTS] Browser Error, trying fallback", e);
    playAudioFallback(text, lang);
  };

  window.speechSynthesis.speak(msg);
};

export const SubItemTranslation: FC<{ text: string }> = ({ text }) => {
  useGate(WordTranslationsGate, text);
  const [currentWordTranslation, learningService, subsLanguage, translateLanguage, wordTranslationsPendings] = useUnit([
    $currentWordTranslation,
    $learningService,
    $subsLanguage,
    $translateLanguage,
    $wordTranslationsPendings,
  ]);

  const [service, setService] = useState<ILearningService | null>(null);

  useEffect(() => {
    setService(getLearningService(learningService) ?? null);
  }, [learningService]);

  if (!currentWordTranslation || wordTranslationsPendings[text]) {
    return null;
  }

  const handleAddWord = (word: string, translation: TWordTranslationItem) => {
    if (service) {
      service
        .addWord(word.toLowerCase(), translation.word, { partOfSpeech: translation.partOfSpeech })
        .then((value) => {
          toast.success(value);
        })
        .catch((error) => {
          toast.error(error);
        });
    }
  };

  if (subsLanguage === translateLanguage) {
    return (
      <div className="es-word-translation" onClick={(e) => e.stopPropagation()}>
        <div className="es-word-translation-languages">
          <div>Select the translation language:</div>
          <TranslateSelect />
        </div>
      </div>
    );
  }

  return (
    <div className="es-word-translation" onClick={(e) => e.stopPropagation()}>
      <div className="es-word-main">
        <div
          className="es-translation-variant-word"
          onClick={(e) => {
            e.stopPropagation();
            handleAddWord(currentWordTranslation.source, {
              word: currentWordTranslation.mainTranslation,
              partOfSpeech: "unknown",
              popularity: 0,
              synonyms: [],
            });
          }}
        >
          {service && (
            <button className="es-settings-button">
              <PlusIcon fill={service.color} />
            </button>
          )}
          <div>{currentWordTranslation.mainTranslation}</div>
        </div>
      </div>
      <hr className="es-word-original-hr" />
      <div className="es-word-original-info">
        <div
          className="es-word-original-sound-icon"
          onClick={() => handlePlaySound(currentWordTranslation.source, currentWordTranslation.detectedSourceLanguage)}
        >
          <SoundIcon />
        </div>
        <div className="es-word-original">{text.toLowerCase()}</div>
      </div>
      <div className="es-translation-variants">
        {currentWordTranslation.translations.length > 0 &&
          currentWordTranslation.translations.map((translation) => (
            <>
              <div
                className="es-translation-variant-word"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddWord(currentWordTranslation.source, translation);
                }}
              >
                {service && (
                  <button className="es-settings-button">
                    <PlusIcon fill={service.color} />
                  </button>
                )}
                <div>{translation.word}</div>
              </div>
              <div className="es-translation-variant-part-of-speach">{translation.partOfSpeech}</div>
              <div className="es-translation-variant-synonyms">{joinTranslations(translation.synonyms)}</div>
            </>
          ))}
      </div>
      {subsLanguage === "en" && (
        <>
          <hr className="es-translation-services-hr" />
          <div className="es-translation-services">
            <a
              className="es-translation-service"
              href={`https://dictionary.cambridge.org/dictionary/english/${text.toLowerCase()}`}
              target="_blank"
            >
              <img src={cambridgeIcon} alt="cambridge dictionary" />
            </a>
            <a
              className="es-translation-service"
              href={`https://forvo.com/search/${text.toLowerCase()}`}
              target="_blank"
            >
              <img src={forvoIcon} alt="forvo" />
            </a>
            <a
              className="es-translation-service"
              href={`https://www.urbandictionary.com/define.php?term=${text.toLowerCase()}`}
              target="_blank"
            >
              <img src={urbandictionaryIcon} alt="urban dictionary" />
            </a>
            <a
              className="es-translation-service"
              href={`https://youglish.com/pronounce/${text.toLowerCase()}/english`}
              target="_blank"
            >
              <img src={youglishIcon} alt="youglish" />
            </a>
          </div>
        </>
      )}
    </div>
  );
};
