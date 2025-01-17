'use client';

import React, { useState } from 'react';
import Tabs from '@/components/Tabs';
import Header from '@/components/Header';
import Dialog from '@/components/Dialog';
import DrawerMenu from '@/components/DrawerMenu';
import LabelValue from '@/components/LabelValue';
import GoToTop from '@/components/GoToTop';
import { useQueryState } from '@/hooks/useQueryState';
import Pagination from '@/components/Pagination';
import Accordion from '@/components/Accordion';
import ToggleTheme from '@/components/ToggleTheme';

export default function Test() {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenDrawer, setIsOpenDrawer] = useState<boolean>(false);

  const {
    page: productPage,
    tab: productTab,
    keyword,
    filters,
    orderBy,
    order,
    setPage,
    setTab,
    setKeyword,
  } = useQueryState({
    page: 2,
  });

  // Dữ liệu tab
  const tabList = [
    { label: 'Dialog', value: 'dialog' },
    { label: 'Drawer', value: 'drawer' },
    { label: 'LabelValue', value: 'labelValue' },
  ];

  const handleTabChange = (value?: string) => {
    setTab(value || 'dialog');
  };

  console.log('filters', filters);
  console.log('order', order);
  console.log('orderBy', orderBy);

  const renderTabContent = () => {
    switch (productTab) {
      case 'dialog':
        return (
          <>
            <button onClick={() => setIsOpen(true)}>Open Dialog</button>
            <Dialog
              isOpen={isOpen}
              onCancel={() => setIsOpen(false)}
              title="Example Dialog"
              submitLabel="Submit"
              cancelLabel="Cancel"
            >
              <p>This is a dialog content.</p>
            </Dialog>
          </>
        );
      case 'drawer':
        return (
          <>
            <button onClick={() => setIsOpenDrawer(true)}>Open Drawer</button>
            <DrawerMenu
              isOpen={isOpenDrawer}
              renderContent={() => <div>Drawer Menu Content</div>}
              handleClose={() => setIsOpenDrawer(false)}
              handleOverlayClick={() => setIsOpenDrawer(false)}
              position="bottom"
            />
          </>
        );
      case 'labelValue':
        return <LabelValue label="Le cong nghia" value={<p>Le cong nghia</p>} />;
      default:
        return null;
    }
  };

  return (
    <main>
      <Header />
      <div className="container">
        <div className="filters">
          <input type="text" value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="Search..." />
        </div>

        <Tabs
          list={tabList}
          value={productTab}
          onChange={handleTabChange}
          className="mb-6"
          tabClassName="text-lg"
          divider={false}
        >
          {renderTabContent()}
        </Tabs>

        <div className="pagination">
          <button onClick={() => setPage(productPage - 1)} disabled={productPage <= 1}>
            Previous
          </button>
          <span>{productPage}</span>
          <button onClick={() => setPage(productPage + 1)}>Next</button>
        </div>

        <Pagination pageCount={10} />

        <Accordion>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Saepe laboriosam, molestias blanditiis quia id
          commodi dolor in temporibus laborum veritatis voluptatibus suscipit alias placeat? Ut incidunt illum aliquid
          perferendis atque! Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ratione fugit sint voluptatem
          aspernatur exercitationem! Autem sapiente, pariatur totam magnam numquam laboriosam, cumque unde quod earum
          aut quasi nisi praesentium! Inventore rem veniam modi quos molestiae placeat soluta in incidunt impedit at
          similique quidem unde reiciendis nulla explicabo, molestias ducimus? Esse harum, aliquam natus asperiores
          voluptatem dolor laborum quam ipsum, dolore culpa impedit quidem ad iusto, sed cupiditate veritatis
          exercitationem iste fuga necessitatibus quaerat! Quo porro enim, accusamus iure impedit eum corrupti sit sed
          repudiandae sequi nulla similique delectus reprehenderit quibusdam ullam natus architecto tempora id cum atque
          officiis quisquam fugit doloremque. Libero laudantium dolores tempora suscipit, odio itaque quos blanditiis
          consequatur a soluta adipisci, veniam quaerat voluptates necessitatibus in quasi eligendi vel fuga, velit
          omnis nostrum sed repellat! Iusto similique ullam labore non ipsam in maxime vitae necessitatibus sit impedit.
          Amet quia quos quidem aut tempore eveniet animi est blanditiis corporis, illo ut nam velit fugit accusantium
          expedita cumque assumenda sed. Commodi dolor minima odio libero et tenetur nisi, asperiores numquam
          repellendus debitis id consequuntur labore corrupti ad soluta maxime necessitatibus velit sequi? Voluptas,
          voluptatum asperiores! Dolor ab voluptate cupiditate, cum harum autem? Ipsa, aperiam a eveniet totam quibusdam
          doloribus voluptatum quas inventore nulla fugiat enim exercitationem earum aut odio minus cupiditate in facere
          dignissimos eos placeat soluta. Illum id atque commodi laboriosam alias vitae, pariatur rem animi praesentium
          veniam modi explicabo minus tempore blanditiis nihil vero labore excepturi, quibusdam maiores numquam eos.
          Doloremque velit id voluptas ullam earum molestias atque quia esse aut eligendi quo voluptatem facilis sed
          sapiente fugiat, inventore magni ex a tempore nisi! Quae accusamus similique saepe hic ipsum tempora
          accusantium beatae, numquam nemo recusandae temporibus nobis voluptate mollitia laudantium voluptates maxime
          culpa laboriosam sunt assumenda doloremque tenetur molestias! Quisquam repudiandae dicta exercitationem,
          tempore animi et.
        </Accordion>

        <ToggleTheme />

        <GoToTop />
      </div>
    </main>
  );
}
