

type TechItemProps = {
  icon: string;
  title: string;
};

const TechItem = ({ icon, title, children }: TechItemProps) => {
  return (
    <>
      <div className="w-11 h-11 bg-white/5 rounded-xl flex items-center justify-center text-2xl 
        hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 cursor-pointer" title={title}>{children}</div>
    </>
  )
}

export default TechItem