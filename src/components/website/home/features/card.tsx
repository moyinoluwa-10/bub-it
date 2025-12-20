interface FeatureCardProps {
  Icon: React.ReactNode;
  Header: string;
  Content: string;
}

export default function FeatureCard({
  Icon,
  Header,
  Content,
}: FeatureCardProps) {
  return (
    <div className="featureCard">
      {Icon}
      <h5 className="mt-6">{Header}</h5>
      <p className="mt-4 mb-6">{Content}</p>
    </div>
  );
}
