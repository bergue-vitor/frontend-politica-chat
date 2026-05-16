import React, { useMemo, useState } from "react";
// @ts-ignore
import "./document-management.css";

// ── Inline SVG icons ──────────────────────────────────────────────────────────

const IconClock3 = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16.5 12" />
  </svg>
);

const IconFileText = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="16" y1="13" x2="8" y2="13" />
    <line x1="16" y1="17" x2="8" y2="17" />
    <polyline points="10 9 9 9 8 9" />
  </svg>
);

const IconPlus = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="12" y1="5" x2="12" y2="19" />
    <line x1="5" y1="12" x2="19" y2="12" />
  </svg>
);

const IconSearch = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const IconX = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const IconUploadCloud = ({ size = 40 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="16 16 12 12 8 16" />
    <line x1="12" y1="12" x2="12" y2="21" />
    <path d="M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3" />
  </svg>
);

const IconChevronDown = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const IconCheck = ({ size = 14 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const IconPower = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18.36 6.64a9 9 0 1 1-12.73 0" />
    <line x1="12" y1="2" x2="12" y2="12" />
  </svg>
);

const IconEyeOff = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
    stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M17.94 17.94A10.94 10.94 0 0 1 12 20C7 20 2.73 16.89 1 12c.92-2.6 2.63-4.84 4.94-6.34" />
    <path d="M10.58 10.58A2 2 0 0 0 12 14a2 2 0 0 0 1.42-.58" />
    <path d="M9.88 5.09A10.94 10.94 0 0 1 12 4c5 0 9.27 3.11 11 8a11.8 11.8 0 0 1-1.67 2.68" />
    <line x1="1" y1="1" x2="23" y2="23" />
  </svg>
);

// ── Types & Data ──────────────────────────────────────────────────────────────

type VersionItem = {
  id: number;
  version: string;
  timelineLabel: string;
  isActive: boolean;
  status: "approved" | "published";
};

type DocumentItem = {
  id: number;
  title: string;
  code: string;
  updatedLabel: string;
  category?: string;
  versions: VersionItem[];
};

const DEFAULT_TIMELINE = [
  "Hoje, 14:30",
  "Ontem, 09:15",
  "10 de Out, 16:40",
  "05 de Out, 10:00",
  "03 de Out, 11:20",
  "28 de Set, 08:10",
  "22 de Set, 15:50",
  "14 de Set, 09:05",
];

const createVersionHistory = (
  labels: string[] = ["2.1", "2.0", "1.9", "1.8"]
): VersionItem[] =>
  labels.map((label, index) => ({
    id: Number(`${Date.now()}${index}`) + Math.floor(Math.random() * 1000),
    version: label,
    timelineLabel: DEFAULT_TIMELINE[index] || `Versão anterior ${index + 1}`,
    isActive: index === 0,
    status: index === 0 ? "approved" : "published",
  }));

const initialDocuments: DocumentItem[] = [
  {
    id: 1,
    title: "Código de Conduta",
    code: "POL-2024-001",
    updatedLabel: "Atualizado ontem",
    versions: createVersionHistory(["2.1", "2.0", "1.9", "1.8"]),
  },
  {
    id: 2,
    title: "Política de Férias",
    code: "POL-2024-042",
    updatedLabel: "Há 3 dias",
    versions: createVersionHistory(["1.7", "1.6", "1.5", "1.4"]),
  },
  {
    id: 3,
    title: "Trabalho Remoto",
    code: "POL-2024-015",
    updatedLabel: "Há 1 semana",
    versions: createVersionHistory(["3.2", "3.1", "3.0", "2.9"]),
  },
  {
    id: 4,
    title: "Benefícios e Auxílios",
    code: "POL-2024-008",
    updatedLabel: "Há 2 semanas",
    versions: createVersionHistory(["1.4", "1.3", "1.2", "1.1"]),
  },
  {
    id: 5,
    title: "Uso de Equipamentos",
    code: "POL-2024-023",
    updatedLabel: "Há 1 mês",
    versions: createVersionHistory(["2.3", "2.2", "2.1", "2.0"]),
  },
];

const CATEGORIES = [
  "Recursos Humanos",
  "Tecnologia da Informação",
  "Financeiro",
  "Jurídico",
  "Operações",
  "Segurança",
  "Outros",
];

// ── Helpers ───────────────────────────────────────────────────────────────────

const getNextVersionNumber = (versions: VersionItem[]) => {
  const highest = Math.max(...versions.map((v) => parseFloat(v.version)));
  return (Math.round((highest + 0.1) * 10) / 10).toFixed(1);
};

const getVersionGridStyle = (count: number) => ({
  gridTemplateColumns: `repeat(${Math.max(count, 4)}, minmax(240px, 1fr))`,
});

// ── Upload Modal ──────────────────────────────────────────────────────────────

type UploadModalProps = {
  onClose: () => void;
  onUpload: (title: string, category: string, file: File) => void;
};

function UploadModal({ onClose, onUpload }: UploadModalProps) {
  const [dragOver, setDragOver] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [docName, setDocName] = useState("");
  const [category, setCategory] = useState("");
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const ACCEPTED = [".pdf", ".docx", ".xlsx"];
  const MAX_MB = 10;

  const handleFile = (file: File) => {
    const ext = "." + file.name.split(".").pop()?.toLowerCase();
    if (!ACCEPTED.includes(ext)) return alert("Formato não suportado. Use PDF, DOCX ou XLSX.");
    if (file.size > MAX_MB * 1024 * 1024) return alert(`O arquivo deve ter no máximo ${MAX_MB}MB.`);
    setSelectedFile(file);
    if (!docName) setDocName(file.name.replace(/\.[^/.]+$/, ""));
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) return alert("Selecione um arquivo.");
    if (!docName.trim()) return alert("Informe o nome do documento.");
    if (!category) return alert("Selecione uma categoria.");
    onUpload(docName.trim(), category, selectedFile);
    onClose();
  };

  return (
    <div className="dm-modal-backdrop" onClick={onClose}>
      <div className="dm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="dm-modal-header">
          <h2>Fazer Upload de Documento</h2>
          <button className="dm-modal-close" onClick={onClose} aria-label="Fechar">
            <IconX size={18} />
          </button>
        </div>

        <div
          className={`dm-dropzone ${dragOver ? "drag-over" : ""} ${selectedFile ? "has-file" : ""}`}
          onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
          onDragLeave={() => setDragOver(false)}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.xlsx"
            style={{ display: "none" }}
            onChange={handleInputChange}
          />
          <div className="dm-dropzone-icon">
            <IconUploadCloud size={38} />
          </div>
          {selectedFile ? (
            <p className="dm-dropzone-filename">{selectedFile.name}</p>
          ) : (
            <>
              <p className="dm-dropzone-text">Arraste e solte o arquivo aqui</p>
              <p className="dm-dropzone-or">ou</p>
              <button
                className="dm-select-file-btn"
                onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
              >
                Selecionar arquivo
              </button>
              <p className="dm-dropzone-hint">Arquivos suportados: PDF, DOCX, XLSX (Máx. 10MB)</p>
            </>
          )}
        </div>

        <div className="dm-modal-fields">
          <div className="dm-modal-field">
            <label htmlFor="doc-name">Nome do Documento</label>
            <input
              id="doc-name"
              type="text"
              placeholder="Ex: Política de Férias 2024"
              value={docName}
              onChange={(e) => setDocName(e.target.value)}
            />
          </div>

          <div className="dm-modal-field">
            <label htmlFor="doc-category">Categoria</label>
            <div className="dm-select-wrap">
              <select
                id="doc-category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="" disabled>Selecione uma categoria</option>
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
              <span className="dm-select-chevron"><IconChevronDown size={16} /></span>
            </div>
          </div>
        </div>

        <div className="dm-modal-footer">
          <button className="dm-modal-cancel" onClick={onClose}>Cancelar</button>
          <button className="dm-modal-submit" onClick={handleSubmit}>Fazer Upload</button>
        </div>
      </div>
    </div>
  );
}

// ── Main Component ────────────────────────────────────────────────────────────

export default function DocumentManagement() {
  const [search, setSearch] = useState("");
  const [documents, setDocuments] = useState<DocumentItem[]>(initialDocuments);
  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [selectedDocumentId, setSelectedDocumentId] = useState<number | null>(null);
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [editingTitle, setEditingTitle] = useState("");
  const titleInputRef = React.useRef<HTMLInputElement>(null);
  const [editingCardId, setEditingCardId] = useState<number | null>(null);
  const [editingCardTitle, setEditingCardTitle] = useState("");
  const cardInputRef = React.useRef<HTMLInputElement>(null);
  const [editingVersionId, setEditingVersionId] = useState<number | null>(null);
  const [editingVersionLabel, setEditingVersionLabel] = useState("");
  const versionInputRef = React.useRef<HTMLInputElement>(null);

  const filteredDocuments = useMemo(() => {
    const term = search.trim().toLowerCase();
    if (!term) return documents;
    return documents.filter((doc) =>
      doc.title.toLowerCase().includes(term) ||
      doc.code.toLowerCase().includes(term) ||
      doc.updatedLabel.toLowerCase().includes(term)
    );
  }, [documents, search]);

  const selectedDocument = useMemo(
    () => documents.find((doc) => doc.id === selectedDocumentId) || null,
    [documents, selectedDocumentId]
  );

  const handleUpload = (title: string, category: string, file: File) => {
    const newDoc: DocumentItem = {
      id: Date.now(),
      title,
      category,
      code: `POL-2024-${String(Math.floor(Math.random() * 900) + 100)}`,
      updatedLabel: "Atualizado agora",
      versions: createVersionHistory(["1.3", "1.2", "1.1", "1.0"]),
    };
    setDocuments((prev) => [newDoc, ...prev]);
  };

  const handleOpenDocument = (documentId: number) => {
    setSelectedDocumentId(documentId);
    setIsEditingTitle(false);
  };

  const handleStartEditTitle = () => {
    if (!selectedDocument) return;
    setEditingTitle(selectedDocument.title);
    setIsEditingTitle(true);
    setTimeout(() => titleInputRef.current?.select(), 0);
  };

  const handleSaveTitle = () => {
    const trimmed = editingTitle.trim();
    if (!trimmed || !selectedDocument) { setIsEditingTitle(false); return; }
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === selectedDocument.id
          ? { ...doc, title: trimmed, updatedLabel: "Atualizado agora" }
          : doc
      )
    );
    setIsEditingTitle(false);
  };

  const handleTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") handleSaveTitle();
    if (e.key === "Escape") setIsEditingTitle(false);
  };

  const handleStartEditCard = (e: React.MouseEvent, doc: DocumentItem) => {
    e.stopPropagation();
    setEditingCardId(doc.id);
    setEditingCardTitle(doc.title);
    setTimeout(() => cardInputRef.current?.select(), 0);
  };

  const handleSaveCardTitle = (docId: number) => {
    const trimmed = editingCardTitle.trim();
    if (trimmed) {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === docId
            ? { ...doc, title: trimmed, updatedLabel: "Atualizado agora" }
            : doc
        )
      );
    }
    setEditingCardId(null);
  };

  const handleCardTitleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, docId: number) => {
    if (e.key === "Enter") handleSaveCardTitle(docId);
    if (e.key === "Escape") setEditingCardId(null);
  };

  const handleStartEditVersion = (e: React.MouseEvent, version: VersionItem) => {
    e.stopPropagation();
    setEditingVersionId(version.id);
    setEditingVersionLabel(version.version);
    setTimeout(() => versionInputRef.current?.select(), 0);
  };

  const handleSaveVersionLabel = (versionId: number) => {
    const trimmed = editingVersionLabel.trim();
    if (trimmed && selectedDocument) {
      setDocuments((prev) =>
        prev.map((doc) =>
          doc.id === selectedDocument.id
            ? {
                ...doc,
                versions: doc.versions.map((v) =>
                  v.id === versionId ? { ...v, version: trimmed } : v
                ),
              }
            : doc
        )
      );
    }
    setEditingVersionId(null);
  };

  const handleVersionLabelKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, versionId: number) => {
    if (e.key === "Enter") handleSaveVersionLabel(versionId);
    if (e.key === "Escape") setEditingVersionId(null);
  };

  const handleDeleteVersion = (e: React.MouseEvent, versionId: number) => {
    e.stopPropagation();
    if (!selectedDocument) return;
    if (selectedDocument.versions.length <= 1) return;
    setDocuments((prev) =>
      prev.map((doc) =>
        doc.id === selectedDocument.id
          ? { ...doc, versions: doc.versions.filter((v) => v.id !== versionId) }
          : doc
      )
    );
  };

  const handleCreateVersion = () => {
    if (!selectedDocument) return;

    const nextVersion = getNextVersionNumber(selectedDocument.versions);

    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== selectedDocument.id) return doc;

        const nextVersions = [
          {
            id: Date.now(),
            version: nextVersion,
            timelineLabel: "Hoje, agora",
            isActive: true,
            status: "approved" as const,
          },
          ...doc.versions.map((version) => ({
            ...version,
            isActive: false,
            status: "published" as const,
          })),
        ];

        return {
          ...doc,
          updatedLabel: "Atualizado agora",
          versions: nextVersions,
        };
      })
    );
  };

  const handleActivateVersion = (versionId: number) => {
    if (!selectedDocument) return;

    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== selectedDocument.id) return doc;

        return {
          ...doc,
          updatedLabel: "Atualizado agora",
          versions: doc.versions.map((version) => ({
            ...version,
            isActive: version.id === versionId,
            status: version.id === versionId ? "approved" : "published",
          })),
        };
      })
    );
  };

  const handleDeactivateVersion = (versionId: number) => {
    if (!selectedDocument) return;

    setDocuments((prev) =>
      prev.map((doc) => {
        if (doc.id !== selectedDocument.id) return doc;

        return {
          ...doc,
          updatedLabel: "Atualizado agora",
          versions: doc.versions.map((version) =>
            version.id === versionId
              ? { ...version, isActive: false, status: "published" as const }
              : version
          ),
        };
      })
    );
  };

  return (
    <div className="dm-page">
      <main className="dm-main dm-main-full">
        <header className="dm-main-topbar">
          <div className="dm-main-title-wrap">
            <h1>Gestão de Documentos</h1>
            <span className="dm-badge">Linha do tempo</span>
          </div>
        </header>

        <section className="dm-content">
          {!selectedDocument ? (
            <>
              <div className="dm-content-head">
                <div className="dm-content-head-left">
                  <div className="dm-section-icon">
                    <IconFileText size={20} />
                  </div>
                  <div>
                    <h2>Documentos</h2>
                    <p>Atualizado há 2 horas</p>
                  </div>
                </div>

                <div className="dm-content-head-right">
                  <label className="dm-search">
                    <IconSearch size={16} />
                    <input
                      type="text"
                      placeholder="Pesquisar..."
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                    />
                  </label>
                </div>
              </div>

              <div className="dm-doc-grid">
                {filteredDocuments.length > 0 ? (
                  filteredDocuments.map((doc) => (
                    <article
                      className="dm-doc-card dm-doc-card-clickable"
                      key={doc.id}
                      onClick={() => editingCardId !== doc.id && handleOpenDocument(doc.id)}
                      onKeyDown={(e) => {
                        if (editingCardId === doc.id) return;
                        if (e.key === "Enter" || e.key === " ") {
                          e.preventDefault();
                          handleOpenDocument(doc.id);
                        }
                      }}
                      role="button"
                      tabIndex={0}
                      aria-label={`Abrir documento ${doc.title}`}
                    >
                      <div className="dm-doc-card-top">
                        <div className="dm-doc-icon">
                          <IconFileText size={18} />
                        </div>
                        <button
                          className="dm-card-edit-btn"
                          onClick={(e) => handleStartEditCard(e, doc)}
                          aria-label={`Editar nome de ${doc.title}`}
                          title="Editar nome"
                        >
                          <svg width={13} height={13} viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                          </svg>
                        </button>
                      </div>
                      <div className="dm-doc-body">
                        {editingCardId === doc.id ? (
                          <div className="dm-card-edit-wrap" onClick={(e) => e.stopPropagation()}>
                            <input
                              ref={cardInputRef}
                              className="dm-card-title-input"
                              value={editingCardTitle}
                              onChange={(e) => setEditingCardTitle(e.target.value)}
                              onKeyDown={(e) => handleCardTitleKeyDown(e, doc.id)}
                              onBlur={() => handleSaveCardTitle(doc.id)}
                              autoFocus
                            />
                          </div>
                        ) : (
                          <h3>{doc.title}</h3>
                        )}
                        <span className="dm-doc-code">{doc.code}</span>
                      </div>
                      <div className="dm-doc-footer">{doc.updatedLabel}</div>
                    </article>
                  ))
                ) : (
                  <div className="dm-empty-state">
                    <div className="dm-empty-icon">
                      <IconSearch size={20} />
                    </div>
                    <h3>Nenhum documento encontrado</h3>
                    <p>Tente buscar por nome, código ou data de atualização.</p>
                  </div>
                )}
              </div>
            </>
          ) : (
            <div className="dm-detail-view">
              <div className="dm-detail-hero">
                <div className="dm-detail-hero-left">
                  <button
                    className="dm-back-btn"
                    onClick={() => setSelectedDocumentId(null)}
                    aria-label="Voltar para documentos"
                  >
                    <svg width={18} height={18} viewBox="0 0 24 24" fill="none"
                      stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="19" y1="12" x2="5" y2="12" />
                      <polyline points="12 19 5 12 12 5" />
                    </svg>
                  </button>

                  <div className="dm-detail-doc-icon">
                    <IconFileText size={22} />
                  </div>

                  <div className="dm-detail-doc-copy">
                    {isEditingTitle ? (
                      <div className="dm-title-edit-wrap">
                        <input
                          ref={titleInputRef}
                          className="dm-title-input"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          onKeyDown={handleTitleKeyDown}
                          onBlur={handleSaveTitle}
                          autoFocus
                        />
                        <button className="dm-title-save-btn" onClick={handleSaveTitle} aria-label="Salvar nome">
                          <IconCheck size={13} />
                        </button>
                      </div>
                    ) : (
                      <div className="dm-title-display" onClick={handleStartEditTitle} title="Clique para editar o nome">
                        <h2>{selectedDocument.title}</h2>
                        <span className="dm-title-edit-icon">
                          <svg width={14} height={14} viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M12 20h9" />
                            <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                          </svg>
                        </span>
                      </div>
                    )}
                    <div className="dm-detail-meta">
                      <span>ID: {selectedDocument.code}</span>
                      <span>•</span>
                      <span>{selectedDocument.updatedLabel}</span>
                    </div>
                  </div>
                </div>

                <button className="dm-version-create-btn" onClick={handleCreateVersion}>
                  <IconPlus size={16} />
                  <span>Criar nova versão</span>
                </button>
              </div>

              <div className="dm-version-scroll">
                <div
                  className="dm-version-timeline-wrap"
                  style={getVersionGridStyle(selectedDocument.versions.length)}
                >
                  <div className="dm-version-track-line" />

                  {selectedDocument.versions.map((version) => (
                    <div className="dm-timeline-item" key={version.id}>
                      <div className="dm-timeline-date">{version.timelineLabel}</div>
                      <div className={`dm-timeline-marker ${version.isActive ? "active" : ""}`}>
                        {version.isActive ? <IconCheck size={12} /> : <IconFileText size={11} />}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="dm-version-cards"
                  style={getVersionGridStyle(selectedDocument.versions.length)}
                >
                  {selectedDocument.versions.map((version) => {

                    return (
                      <article
                        className={`dm-version-card ${version.isActive ? "active" : ""}`}
                        key={version.id}
                      >
                        <div className="dm-version-card-head">
                          <div className="dm-version-card-copy">
                            {editingVersionId === version.id ? (
                              <div className="dm-version-edit-wrap">
                                <input
                                  ref={versionInputRef}
                                  className="dm-version-input"
                                  value={editingVersionLabel}
                                  onChange={(e) => setEditingVersionLabel(e.target.value)}
                                  onKeyDown={(e) => handleVersionLabelKeyDown(e, version.id)}
                                  onBlur={() => handleSaveVersionLabel(version.id)}
                                  autoFocus
                                />
                              </div>
                            ) : (
                              <h3>
                                versão {version.version}
                                <span>Publicada</span>
                              </h3>
                            )}
                          </div>

                          <div className="dm-version-card-actions">
                            {version.status === "approved" && editingVersionId !== version.id && (
                              <span className="dm-version-approved-badge">APROVADO</span>
                            )}
                            <button
                              className="dm-version-icon-btn"
                              onClick={(e) => handleStartEditVersion(e, version)}
                              aria-label="Editar versão"
                              title="Editar número da versão"
                            >
                              <svg width={12} height={12} viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <path d="M12 20h9" />
                                <path d="M16.5 3.5a2.12 2.12 0 1 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
                              </svg>
                            </button>
                            <button
                              className="dm-version-icon-btn dm-version-icon-btn-danger"
                              onClick={(e) => handleDeleteVersion(e, version.id)}
                              aria-label="Excluir versão"
                              title={selectedDocument.versions.length <= 1 ? "Não é possível excluir a única versão" : "Excluir versão"}
                              disabled={selectedDocument.versions.length <= 1}
                            >
                              <svg width={12} height={12} viewBox="0 0 24 24" fill="none"
                                stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                <polyline points="3 6 5 6 21 6" />
                                <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
                                <path d="M10 11v6" />
                                <path d="M14 11v6" />
                                <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
                              </svg>
                            </button>
                          </div>
                        </div>

                        <div className="dm-version-card-spacer" />

                        <div className="dm-version-card-footer">
                          {version.isActive ? (
                            <button
                              className="dm-version-action dm-version-action-secondary"
                              onClick={() => handleDeactivateVersion(version.id)}
                            >
                              <IconEyeOff size={16} />
                              <span>Desativar versão</span>
                            </button>
                          ) : (
                            <button
                              className="dm-version-action dm-version-action-primary"
                              onClick={() => handleActivateVersion(version.id)}
                            >
                              <IconPower size={16} />
                              <span>Ativar versão</span>
                            </button>
                          )}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>
      </main>

      {isUploadModalOpen && (
        <UploadModal
          onClose={() => setIsUploadModalOpen(false)}
          onUpload={handleUpload}
        />
      )}
    </div>
  );
}