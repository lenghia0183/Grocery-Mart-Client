'use client';

import { Form, Formik } from 'formik';
import QuantityInput from '@/components/QuantityInput';
import Button from '@/components/Button';
import IconButton from '@/components/IconButton';
import formatCurrency from '@/utils/formatCurrency';
import LabelValue from '@/components/LabelValue';

interface ProductFormProps {
  product: {
    id: string;
    name: string;
    price: number;
    inStock: boolean;
    branch: string;
    rating: number;
    description: string;
  };
}

const ProductForm: React.FC<ProductFormProps> = ({ product }) => {
  return (
    <Formik initialValues={{ quantity: 1 }} onSubmit={(values) => console.log('Submit', values)}>
      <Form>
        <p className="text-2xl font-medium mt-3 dark:text-white">Số lượng</p>
        <div className="flex mt-3">
          {/* left column */}
          <div className="flex-1">
            <QuantityInput name="quantity" width="140px" height="50px" buttonClassName="dark:text-white" />
          </div>

          {/* right column */}
          <div className="border border-gray-500 p-7 rounded-md flex-1">
            <LabelValue
              labelClassName="!font-normal "
              value={<p className="bg-green-100 px-1 rounded-sm ">0%</p>}
              label={formatCurrency(product.price)}
            />

            <LabelValue
              className="mt-5"
              labelClassName="text-[30px] font-medium"
              label={formatCurrency(product.price)}
            />

            <div className="flex gap-5 mt-5">
              <Button size="large">Thêm vào giỏ hàng</Button>
              <IconButton
                iconName="heart"
                variant="outlined"
                size="medium"
                borderColor="gray-500"
                borderHoverColor="blue-500"
                iconHoverColor="blue-500"
                iconColor="gray-500 "
                bgHoverColor="none"
              />
            </div>
          </div>
        </div>
      </Form>
    </Formik>
  );
};

export default ProductForm;
