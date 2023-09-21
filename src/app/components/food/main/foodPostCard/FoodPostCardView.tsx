import { TFoodPostData } from '@/apis/foodPost/queries/useGetFoodPostQuery';
import { colors } from '@/asset/colors';
import { blurDataURL } from '@/asset/const/blurUrl';
import Image from 'next/image';
import { styled } from 'styled-components';
import { commonImages } from '../../../../../../public/images';
import CopyToClipboard from 'react-copy-to-clipboard';
import ClipboardIcon from '../../../../../../public/svg/ClipboardIcon';
import { useCallback } from 'react';
import { toast } from 'react-toastify';

interface Props {
    onDetail: (id: number) => void;
    data: TFoodPostData;
    targetVisibleId: number | null;
    onMouseEnter: (id: number) => void;
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
        <Card
            onClick={() => {
                onDetail(data.id);
            }}
            onMouseEnter={() => {
                onMouseEnter(data.id);
            }}
            onMouseLeave={onMouseLeave}
        >
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

const Card = styled.div`
    position: relative;
    cursor: pointer;
`;
const Img = styled(Image)<{ isImgSize: boolean }>`
    width: 300px;
    height: auto;
    ${(props) =>
        props.isImgSize && {
            aspectRatio: 1.8,
            objectFit: 'cover',
        }}
`;
const InfoContainer = styled.div`
    padding: 12px;
    background-color: rgba(0, 0, 0, 0.3);
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 10;
    top: 0;
`;

const Desc = styled.p`
    font-size: 20px;
    line-height: 24px;
    letter-spacing: -0.05em;
    font-weight: 600;
    color: ${colors.white};
    overflow: hidden;
    text-overflow: ellipsis;
`;

const UserInfo = styled.div`
    position: absolute;
    bottom: 12px;
    left: 12px;
    font-weight: 200;
    font-size: 1.2rem;
    line-height: 1.6rem;
    letter-spacing: -0.05em;
    color: ${colors.white};
    display: flex;
    align-items: center;
    & span {
        margin-left: 5px;
        width: 150px;
        overflow-x: hidden;
        text-overflow: ellipsis;
    }
`;
const ProfileImage = styled(Image)`
    border-radius: 50%;
`;
const Btn = styled.button`
    position: absolute;
    bottom: 12px;
    right: 12px;
    display: flex;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    padding: 8px;
`;

export default FoodPostCardView;
