// Update import statement in your page component
import SignUpForm from '../components/SignUpForm.client';

export default function Home() {
  return (
    <div>
      <h1>Home</h1>
      <SignUpForm /> {/* Include the SignUpForm component */}
    </div>
  );
}
