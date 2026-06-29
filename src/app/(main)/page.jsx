import FeaturedLessons from '@/components/home/FeaturedLessons';
import Hero from '@/components/home/Hero';
import MostSavedLessons from '@/components/home/MostSavedLessons';
import TopContributors from '@/components/home/TopContributors';
import WhyLearningMatters from '@/components/home/WhyLearningMatters';


const MainHomePage = () => {
    return (
        <div>
            <Hero/>
            <FeaturedLessons/>
            <WhyLearningMatters/>
            <TopContributors/>
            <MostSavedLessons/>
        </div>
    );
};

export default MainHomePage;