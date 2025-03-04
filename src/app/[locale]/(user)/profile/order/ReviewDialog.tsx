import Autocomplete from '@/components/AutoComplete';
import Dialog from '@/components/Dialog';
import TextArea from '@/components/TextArea';
import { useToast } from '@/context/toastProvider';
import { WithLoading } from '@/hocs/withLoading';
import { useAddReview } from '@/services/api/https/review';
import { CartDetail } from '@/types/cart';
import { ReviewFormValues } from '@/types/review';
import { useTranslations } from 'next-intl';

interface ReviewDialogProp {
  isOpen: boolean;
  onCancel: () => void;
  selectedCartDetail: CartDetail | null;
}

const ReviewDialog = ({ isOpen, onCancel, selectedCartDetail }: ReviewDialogProp) => {
  const { trigger: addReview, isMutating: isMutatingAddReview } = useAddReview();

  const { success, error } = useToast();
  const tCommon = useTranslations('common');

  const initialValues: ReviewFormValues = {
    rating: { label: '5 sao', value: 5 },
    content: '',
  };

  const ratingList = [
    { label: '5 sao', value: 5 },
    { label: '4 sao', value: 4 },
    { label: '3 sao', value: 3 },
    { label: '2 sao', value: 2 },
    { label: '1 sao', value: 1 },
  ];

  return (
    <WithLoading isLoading={isMutatingAddReview}>
      <Dialog
        title="Thêm đánh giá"
        isOpen={isOpen}
        onCancel={onCancel}
        cancelLabel={tCommon('cancel')}
        submitLabel={tCommon('confirm')}
        formikProps={{
          initialValues,
          onSubmit: (values) => {
            addReview(
              {
                rating: values?.rating?.value,
                content: values?.content,
                productId: selectedCartDetail?.productId?._id || '',
                cartDetailId: selectedCartDetail?._id || '',
              },
              {
                onSuccess: (response) => {
                  if (response.code === 201) {
                    success('Thêm đánh giá thành công');
                    onCancel();
                  } else {
                    error(response.message);
                    onCancel();
                  }
                },
                onError: (error) => {
                  error(tCommon('hasErrorTryAgainLater'));
                  onCancel();
                },
              },
            );
          },
        }}
      >
        <div className="flex flex-col gap-7">
          <Autocomplete
            options={ratingList}
            getOptionLabel={(val) => {
              return val.label;
            }}
            name="rating"
            label="Đánh giá của bạn"
            required
          />
          <TextArea name="content" label="Nội dung đánh giá" rows={5} required />
        </div>
      </Dialog>
    </WithLoading>
  );
};

export default ReviewDialog;
