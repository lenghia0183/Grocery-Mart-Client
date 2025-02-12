'use server';

import SideBar from './sideBar';

export default async function ProfileLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gray-100">
      <div className="grid grid-cols-12 container gap-7 py-14">
        <div className="col-span-3">
          <SideBar />
        </div>
        <div className="col-span-9">{children}</div>
      </div>
    </div>
  );
}
