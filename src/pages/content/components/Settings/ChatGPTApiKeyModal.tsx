import { FC, useState, useEffect } from "react";
import { useUnit } from "effector-react";

import {
  $chatGPTApiKeyModalOpen,
  chatGPTApiKeyModalClosed,
  $chatGPTApiKey,
  chatGPTApiKeyChanged,
  $chatGPTModel,
  chatGPTModelChanged,
} from "@src/models/settings";

export const ChatGPTApiKeyModal: FC = () => {
  const [
    isModalOpen,
    handleModalClose,
    currentApiKey,
    handleApiKeyChange,
    currentModel,
    handleModelChange,
  ] = useUnit([
    $chatGPTApiKeyModalOpen,
    chatGPTApiKeyModalClosed,
    $chatGPTApiKey,
    chatGPTApiKeyChanged,
    $chatGPTModel,
    chatGPTModelChanged,
  ]);

  const [tempApiKey, setTempApiKey] = useState(currentApiKey);
  const [tempModel, setTempModel] = useState(currentModel);

  useEffect(() => {
    if (isModalOpen) {
      setTempApiKey(currentApiKey);
      setTempModel(currentModel);
    }
  }, [isModalOpen, currentApiKey, currentModel]);

  const handleSave = () => {
    handleApiKeyChange(tempApiKey);
    handleModelChange(tempModel);
    handleModalClose();
  };

  const handleCancel = () => {
    setTempApiKey(currentApiKey);
    setTempModel(currentModel);
    handleModalClose();
  };

  if (!isModalOpen) {
    return null;
  }

  return (
    <div className="es-modal-overlay">
      <div className="es-modal-content">
        <div className="es-modal-header">
          <h3>ChatGPT API Key Configuration</h3>
          <button className="es-modal-close" onClick={handleCancel}>
            ×
          </button>
        </div>

        <div className="es-modal-body">
          <div className="es-modal-field">
            <label htmlFor="chatgpt-api-key">API Key:</label>
            <input
              id="chatgpt-api-key"
              type="password"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              placeholder="Enter your ChatGPT API key"
              className="es-modal-input"
            />
          </div>

          <div className="es-modal-field">
            <label htmlFor="chatgpt-model">Model:</label>
            <input
              id="chatgpt-model"
              type="text"
              value={tempModel}
              onChange={(e) => setTempModel(e.target.value)}
              placeholder="e.g., gpt-4o-mini, gpt-4o, gpt-3.5-turbo"
              className="es-modal-input"
            />
          </div>

          <div className="es-modal-info">
            <p>
              ChatGPT API key is required for translation. Please enter your
              OpenAI API key and choose a model to use this service.
            </p>
            <p>
              Get your ChatGPT API key at{" "}
              <a
                href="https://platform.openai.com/api-keys"
                target="_blank"
                rel="noopener noreferrer"
              >
                platform.openai.com/api-keys
              </a>
            </p>
            <p>
              Note: Usage is based on OpenAI's pricing model. Monitor your usage
              to avoid unexpected charges.
            </p>
          </div>
        </div>

        <div className="es-modal-footer">
          <button
            className="es-modal-button es-modal-button--secondary"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <button
            className="es-modal-button es-modal-button--primary"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
