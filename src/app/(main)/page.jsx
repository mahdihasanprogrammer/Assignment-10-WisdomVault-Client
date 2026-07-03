import FeaturedLessons from '@/components/home/FeaturedLessons';
import Hero from '@/components/home/Hero';
import MostSavedLessons from '@/components/home/MostSavedLessons';
import TopContributors from '@/components/home/TopContributors';
import WhyLearningMatters from '@/components/home/WhyLearningMatters';


const MainHomePage = () => {

    const dayStart = new Date();
    dayStart.setHours(0, 0, 0, 0)
    dayStart.setDate(dayStart.getDate())
    console.log('dayStart', dayStart)
    return (
        <div>
            <Hero />
            <FeaturedLessons />
            <WhyLearningMatters />
            <TopContributors />
            <MostSavedLessons />
        </div>
    );
};

export default MainHomePage;