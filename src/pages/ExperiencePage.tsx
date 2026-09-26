import Education from '@/components/Education';
import Experience from '@/components/Experience';
import ProblemSolving from '@/components/ProblemSolving';

export default function ExperiencePage() {
  return (
    <div className="pt-8 pb-16 space-y-8">
      <Experience />
      <ProblemSolving />
      <Education />
    </div>
  );
}
