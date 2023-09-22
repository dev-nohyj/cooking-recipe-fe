import { TFoodPostData } from '@/apis/foodPost/queries/useGetFoodPostQuery';
import { blurDataURL } from '@/asset/const/blurUrl';
import { commonImages } from '../../../../../../public/images';
import CopyToClipboard from 'react-copy-to-clipboard';
import ClipboardIcon from '../../../../../../public/svg/ClipboardIcon';
import { useCallback } from 'react';
import { toast } from 'react-toastify';
import { Btn, Card, Desc, Img, InfoContainer, ProfileImage, UserInfo } from '../FoodMain.style';

interface Props {
    onDetail: () => void;
    data: TFoodPostData;
    targetVisibleId: number | null;
    onMouseEnter: () => void;
    onMouseLeave: () => void;
    isImgSize?: boolean;
}

const FoodPostCardView = ({
    onDetail,
    data,
    targetVisibleId,
    onMouseEnter,
    onMouseLeave,
    isImgSize = false,
}: Props) => {
    const onCopy = useCallback(() => {
        return toast('URL이 복사되었습니다.', {
            position: 'top-center',
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            rtl: false,
            pauseOnFocusLoss: false,
            draggable: true,
            pauseOnHover: true,
        });
    }, []);
    return (
        <Card onClick={onDetail} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            <Img
                alt="img"
                src={data.imageUrl}
                width="0"
                height="0"
                sizes="100vw"
                placeholder="blur"
                blurDataURL={blurDataURL}
                isImgSize={isImgSize}
            />
            {targetVisibleId === data.id && (
                <InfoContainer>
                    {data.description && <Desc>{data.description}</Desc>}
                    <UserInfo>
                        <ProfileImage
                            width={20}
                            height={20}
                            src={
                                data.author.profileImageUrl
                                    ? data.author.profileImageUrl
                                    : commonImages.defaultProfileSm.uri
                            }
                            alt="profileImage"
                        />
                        <span>{data.author.nickname}</span>
                    </UserInfo>
                    <CopyToClipboard text={process.env.CLIENT_URL + `/food/detail/${data.id}`} onCopy={onCopy}>
                        <Btn
                            onClick={(e) => {
                                e.stopPropagation();
                            }}
                        >
                            <ClipboardIcon />
                        </Btn>
                    </CopyToClipboard>
                </InfoContainer>
            )}
        </Card>
    );
};

export default FoodPostCardView;
