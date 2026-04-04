interface PageHeaderProps {
  title: string;
  subtitle?: string;
}

export default function PageHeader({ title, subtitle }: PageHeaderProps) {
  return (
    <div style={{ marginBottom: '24px' }}>
      <h1 style={{ margin: 0, color: '#fff', fontSize: '32px' }}>{title}</h1>
      {subtitle && (
        <p style={{ marginTop: '8px', color: '#94a3b8' }}>{subtitle}</p>
      )}
    </div>
  );
}