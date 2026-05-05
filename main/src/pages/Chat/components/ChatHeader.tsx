import { useState } from 'react';
import { Check, Copy, Share2, X } from 'lucide-react';

type SharePermission = 'read' | 'edit';

export function ChatHeader() {
  const [isShareOpen, setIsShareOpen] = useState(false);
  const [permission, setPermission] = useState<SharePermission>('read');
  const [generatedLink, setGeneratedLink] = useState('');
  const [isCopied, setIsCopied] = useState(false);

  function handleGenerateLink() {
    const shareUrl = new URL(window.location.href);

    shareUrl.searchParams.set('share', crypto.randomUUID());
    shareUrl.searchParams.set('permission', permission);

    setGeneratedLink(shareUrl.toString());
    setIsCopied(false);
  }

  async function handleCopyLink() {
    if (!generatedLink) {
      return;
    }

    await navigator.clipboard.writeText(generatedLink);
    setIsCopied(true);
  }

  function handleCloseShare() {
    setIsShareOpen(false);
    setGeneratedLink('');
    setIsCopied(false);
  }

  return (
    <header className="chat-header">
      <div className="chat-header-main">
        <h1 className="chat-header-title">Assistente de Políticas</h1>
      </div>

      <div className="chat-header-actions" aria-label="Ações do chat">
        <button
          type="button"
          className="chat-icon-button"
          onClick={() => setIsShareOpen(true)}
          aria-label="Compartilhar chat"
          title="Compartilhar"
        >
          <Share2 size={16} />
        </button>
      </div>

      {isShareOpen && (
        <div className="chat-share-backdrop" role="presentation">
          <section
            className="chat-share-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="chat-share-title"
          >
            <header className="chat-share-header">
              <div>
                <h2 id="chat-share-title">Compartilhar chat</h2>
                <p>Escolha o nível de acesso e gere um link seguro.</p>
              </div>

              <button
                type="button"
                className="chat-share-close"
                onClick={handleCloseShare}
                aria-label="Fechar compartilhamento"
              >
                <X size={17} />
              </button>
            </header>

            <fieldset className="chat-share-permissions">
              <legend>Permissão</legend>

              <label className="chat-share-option">
                <input
                  type="radio"
                  name="share-permission"
                  value="read"
                  checked={permission === 'read'}
                  onChange={() => setPermission('read')}
                />
                <span>
                  <strong>Somente leitura</strong>
                  A pessoa pode abrir e consultar a conversa.
                </span>
              </label>

              <label className="chat-share-option">
                <input
                  type="radio"
                  name="share-permission"
                  value="edit"
                  checked={permission === 'edit'}
                  onChange={() => setPermission('edit')}
                />
                <span>
                  <strong>Pode editar</strong>
                  A pessoa pode continuar e modificar a conversa.
                </span>
              </label>
            </fieldset>

            <div className="chat-share-link-area">
              <button type="button" className="chat-share-generate" onClick={handleGenerateLink}>
                Gerar link
              </button>

              {generatedLink && (
                <div className="chat-share-link-box">
                  <input type="text" value={generatedLink} readOnly aria-label="Link compartilhável" />
                  <button type="button" onClick={handleCopyLink}>
                    {isCopied ? <Check size={16} /> : <Copy size={16} />}
                    {isCopied ? 'Copiado' : 'Copiar'}
                  </button>
                </div>
              )}
            </div>
          </section>
        </div>
      )}
    </header>
  );
}
