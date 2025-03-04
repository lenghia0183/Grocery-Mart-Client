import Autocomplete from '@/components/AutoComplete';
import Dialog from '@/components/Dialog';
import TextArea from '@/components/TextArea';
import { RATING_LIST } from '@/constants/common';
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
  const t = useTranslations('order.dialog');

  const initialValues: ReviewFormValues = {
    rating: RATING_LIST[0],
    content: '',
  };

  return (
    <WithLoading isLoading={isMutatingAddReview}>
      <Dialog
        title={t('title')}
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
                    success(t('successful'));
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
            options={RATING_LIST}
            getOptionLabel={(val) => {
              return tCommon(val.label);
            }}
            name="rating"
            label={t("yourRating")}
            required
          />
          <TextArea name="content" label={t("content")} rows={5} required />
        </div>
      </Dialog>
    </WithLoading>
  );
};

export default ReviewDialog;
