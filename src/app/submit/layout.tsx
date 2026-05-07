import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Submit AI Tool | Recommend a New AI Tool | STYK Ai',
  description: 'Recommend a great AI tool to be featured on STYK Ai. Submit your favorite AI tools for review and listing.',
  alternates: {
    canonical: '/submit',
  },
};

export default function SubmitLayout({ children }: { children: React.ReactNode }) {
  return children;
}
