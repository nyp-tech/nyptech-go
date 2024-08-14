"use client"
import FeatureForm from './FeatureForm';
import FeatureList from './FeatureList';

const HomePage = () => {
  return (
    <div className="home-page m-5 p-5">
      <h1 className='font-bold text-2xl'>Feature Suggestions</h1>
      <p>
      If you would like us to add new features suggest it here and see it get included.
      </p>
      <FeatureForm />
      <FeatureList />
    </div>
  );
};

export default HomePage;
