import { getTranslations } from 'next-intl/server';

export default async function Page() {
  const t = await getTranslations('testPage');
  return (
    <div>
      <h1>{t('openDialog')}</h1>
    </div>
  );
}
