'use client';

import { useGetManufacturer } from '@/services/api/https/manufacturer';

import CheckBoxGroup from '@/components/CheckBoxGroup';
import CheckBox from '@/components/CheckBox';
import ManufacturerSkeleton from '@/components/Skeletons/ManufacturerListSkeleton';
import Accordion from '@/components/Accordion';

const ManufacturerList = () => {
  const { data, isLoading } = useGetManufacturer();

  if (isLoading) {
    return <ManufacturerSkeleton />;
  }

  return (
    <Accordion minHeight="165px">
      <div className="mt-3">
        <CheckBoxGroup name="manufacturers">
          {data?.manufacturers?.map(({ name, _id }: { name: string; _id: string }) => (
            <CheckBox
              key={_id}
              label={name}
              name={_id}
              labelClassName="text-dark dark:text-white-200"
              borderColor="dark dark:white"
            />
          ))}
        </CheckBoxGroup>
      </div>
    </Accordion>
  );
};

export default ManufacturerList;
