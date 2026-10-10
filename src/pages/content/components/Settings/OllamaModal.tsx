import { FC, useEffect, useState } from "react";
import { useUnit } from "effector-react";

import {
  $ollamaModalOpen,
  $ollamaModel,
  $ollamaUrl,
  ollamaModalClosed,
  ollamaModelChanged,
  ollamaUrlChanged,
} from "@src/models/settings";

// Where Ollama runs and which of its models translates. The models it has pulled are listed when it answers.
export const OllamaModal: FC = () => {
  const isOpen = useUnit($ollamaModalOpen);
  // Mounted on opening, so the fields start from the settings
  return isOpen ? <OllamaDialog /> : null;
};

const OllamaDialog: FC = () => {
  const [close, currentUrl, currentModel, changeUrl, changeModel] = useUnit([
    ollamaModalClosed,
    $ollamaUrl,
    $ollamaModel,
    ollamaUrlChanged,
    ollamaModelChanged,
  ]);
  const [url, setUrl] = useState(currentUrl);
  const [model, setModel] = useState(currentModel);
  const [models, setModels] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Asks Ollama for its models whenever the address changes
  useEffect(() => {
    let active = true;
    const timer = setTimeout(async () => {
      const answer = await chrome.runtime.sendMessage({ type: "ollamaModels", url }).catch((reason: Error) => ({
        error: reason.message,
      }));
      if (!active) return;
      if (answer?.models) {
        setError(null);
        setModels(answer.models);
        setModel((picked) => picked || answer.models[0] || "");
      } else {
        setModels([]);
        setError(answer?.error ?? "Ollama didn't answer");
      }
    }, 300);
    return () => {
      active = false;
      clearTimeout(timer);
    };
  }, [url]);

  const handleSave = () => {
    changeUrl(url);
    changeModel(model);
    close();
  };

  return (
    <div className="es-modal-overlay">
      <div className="es-modal-content">
        <div className="es-modal-header">
          <h3>Ollama</h3>
          <button className="es-modal-close" onClick={() => close()}>
            ×
          </button>
        </div>

        <div className="es-modal-body">
          <div className="es-modal-field">
            <label htmlFor="ollama-url">Address:</label>
            <input
              id="ollama-url"
              type="text"
              value={url}
              onChange={(event) => setUrl(event.target.value)}
              placeholder="http://localhost:11434"
              className="es-modal-input"
            />
          </div>

          <div className="es-modal-field">
            <label htmlFor="ollama-model">Model:</label>
            <input
              id="ollama-model"
              type="text"
              list="ollama-models"
              value={model}
              onChange={(event) => setModel(event.target.value)}
              placeholder="e.g. translategemma:4b, gemma3:4b, qwen3:8b"
              className="es-modal-input"
            />
            <datalist id="ollama-models">
              {models.map((name) => (
                <option key={name} value={name} />
              ))}
            </datalist>
          </div>

          <div className="es-modal-info">
            {error ? (
              <p>{error}</p>
            ) : (
              <p>
                {models.length > 0
                  ? `Ollama has ${models.length} model${models.length === 1 ? "" : "s"}: ${models.join(", ")}.`
                  : "Asking Ollama for its models…"}
              </p>
            )}
            <p>
              Translation runs on your computer with the model you pick. Get Ollama at{" "}
              <a href="https://ollama.com" target="_blank" rel="noopener noreferrer">
                ollama.com
              </a>{" "}
              and pull a model, for example <code>ollama pull translategemma:4b</code>.
            </p>
          </div>
        </div>

        <div className="es-modal-footer">
          <button className="es-modal-button es-modal-button--secondary" onClick={() => close()}>
            Cancel
          </button>
          <button className="es-modal-button es-modal-button--primary" onClick={handleSave} disabled={!model.trim()}>
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
