import { FC, useState, PropsWithChildren } from "react";

import cn from "classnames";

import { PlusIcon } from "./assets/PlusIcon";
import { MinusIcon } from "./assets/MinusIcon";

type TQuestionTitleProps = {
  onClick: () => void;
  isActive: boolean;
};

const QuestionTitle: FC<PropsWithChildren<TQuestionTitleProps>> = ({ children, onClick, isActive }) => {
  return (
    <div className="question-title-wrapper" onClick={onClick}>
      <div className="question-title">{children}</div>
      <div className={cn("question-title-icon", { active: isActive })}>{isActive ? <MinusIcon /> : <PlusIcon />}</div>
    </div>
  );
};

const Answer: FC<PropsWithChildren> = ({ children }) => {
  return <div className="answer">{children}</div>;
};

export const FAQ = () => {
  const [activeQA, setActiveQA] = useState(null);

  const isActive = (id: number) => {
    return activeQA === id;
  };
  return (
    <div className="faq">
      <h1 className="title">Frequently asked questions</h1>
      <div className="subtitle">
        Can’t find the answer you’re looking for?
        <br />
        Write to our{" "}
        <a href="https://t.me/easysubs_ext" target="_blank">
          support chat.
        </a>
      </div>

      <div className="questions">
        <div className="question">
          <QuestionTitle
            isActive={isActive(1)}
            onClick={() => {
              setActiveQA(1);
            }}
          >
            Extension not working with Kinopub custom domain?
          </QuestionTitle>
          {isActive(1) && (
            <Answer>
              If you are using a personal mirror for Kinobub then you need to give permissions to run the extension on
              the specific domain. To do this:
              <ul>
                <li>Open Kinopub using a personal link</li>
                <li>
                  <p>Select "Enable on Kinopub" in the extension menu</p>
                  <img src={chrome.runtime.getURL("assets/images/enable-kinopub.png")} width={400} />
                </li>
                <li>
                  <p>Confirm the permission in the modal window</p>
                </li>
                <img src={chrome.runtime.getURL("assets/images/confirm-permissions.png")} width={600} />
              </ul>
              After that reload the page and the extension will work 🎉
            </Answer>
          )}
        </div>
        <div className="question">
          <QuestionTitle
            isActive={isActive(2)}
            onClick={() => {
              setActiveQA(2);
            }}
          >
            Have you found a bug or have ideas for development?
          </QuestionTitle>
          {isActive(2) && (
            <Answer>
              You can write to our{" "}
              <a href="https://t.me/easysubs_ext" target="_blank">
                support chat
              </a>{" "}
              where we discuss how the extension works and share ideas
            </Answer>
          )}
        </div>
        <div className="question">
          <QuestionTitle
            isActive={isActive(3)}
            onClick={() => {
              setActiveQA(3);
            }}
          >
            How can I enable Anki integration?
          </QuestionTitle>
          {isActive(3) && (
            <Answer>
              To integrate with Anki you need to do the following steps:
              <ul>
                <li>Select Anki from the application menu</li>
                <li>
                  <p>Select "Enable on Kinopub" in the extension menu</p>
                  <img src={chrome.runtime.getURL("assets/images/select-anki.jpg")} width={400} />
                </li>
                <li>
                  <p>
                    Install AnkiConnect according to the{" "}
                    <a href="https://foosoft.net/projects/anki-connect/" target="_blank">
                      instruction
                    </a>
                  </p>
                </li>
              </ul>
              Once that's done, the integration will work. Words will be added to the "Easysubs" dictionary, if it does
              not exist, it will be created automatically
            </Answer>
          )}
        </div>
      </div>
    </div>
  );
};
