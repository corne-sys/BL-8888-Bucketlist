import Link from 'next/link';
import SchemaOrg from './SchemaOrg';

interface BreadcrumbItem {
  label: string;
  url?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
}

export default function Breadcrumbs({ items }: BreadcrumbsProps) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

  // Generate BreadcrumbList Schema.org data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${baseUrl}`,
      },
      ...items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 2,
        name: item.label,
        item: item.url ? `${baseUrl}${item.url}` : undefined,
      })),
    ],
  };

  return (
    <>
      <SchemaOrg schema={breadcrumbSchema} />
      <nav aria-label="Kruimelpad" className="my-4 py-2 text-sm">
        <ol className="flex flex-wrap items-center gap-2 text-gold">
          <li>
            <Link
              href="/"
              className="text-primary/70 hover:text-gold transition-colors font-medium"
            >
              Home
            </Link>
          </li>
          {items.map((item, index) => {
            const isLast = index === items.length - 1;
            return (
              <li key={index} className="flex items-center gap-2">
                <span className="text-primary/30 select-none">/</span>
                {isLast || !item.url ? (
                  <span className="text-primary font-semibold select-all" aria-current="page">
                    {item.label}
                  </span>
                ) : (
                  <Link
                    href={item.url}
                    className="text-primary/70 hover:text-gold transition-colors font-medium"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
