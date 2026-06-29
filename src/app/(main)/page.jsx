import FeaturedLessons from '@/components/home/FeaturedLessons';
import Hero from '@/components/home/Hero';
import TopContributors from '@/components/home/TopContributors';
import WhyLearningMatters from '@/components/home/WhyLearningMatters';


const MainHomePage = () => {
    return (
        <div>
            <Hero/>
            <FeaturedLessons/>
            <WhyLearningMatters/>
            <TopContributors/>
        </div>
    );
};

export default MainHomePage;