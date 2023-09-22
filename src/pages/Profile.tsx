import Header from '../components/Header';
import Footer from '../components/Footer';

function Profile() {
  return (
    <>
      <Header title="Profile" showSearch={ false } showProfile />
      <div>Profile</div>
      <Footer />
    </>
  );
}

export default Profile;
