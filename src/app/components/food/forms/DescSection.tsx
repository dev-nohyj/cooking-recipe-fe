import { Control, Controller } from 'react-hook-form';
import { DescInput } from './FoodForm.style';

interface Props {
    control: Control<
        {
            description: string | undefined;
            tags: string[];
            foodImages: {
                id?: number | undefined;
                url: string;
            }[];
        },
        any
    >;
}

const DescSection = ({ control }: Props) => {
    return (
        <section>
            <Controller
                control={control}
                name="description"
                render={({ field: { onChange, value } }) => {
                    return (
                        <DescInput
                            placeholder="이미지의 설명을 추가해 보세요 (생략이 가능합니다)"
                            maxLength={300}
                            onChange={onChange}
                            value={value}
                        />
                    );
                }}
            />
        </section>
    );
};

export default DescSection;
