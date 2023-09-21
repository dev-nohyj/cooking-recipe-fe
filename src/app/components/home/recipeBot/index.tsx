import { useCallback } from 'react';
import { useRouter } from 'next/navigation';
import RecipeBotView from './RecipeBotView';

interface Props {}

const RecipeBot = ({}: Props) => {
    const router = useRouter();
    const onRouteBot = useCallback(() => {
        router.push('/ai/recipeAiInfo');
    }, []);

    return <RecipeBotView onRouteBot={onRouteBot} />;
};

export default RecipeBot;
