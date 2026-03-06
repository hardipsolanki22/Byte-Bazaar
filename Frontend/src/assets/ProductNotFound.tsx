const ProductNotFoundWithText = ({ 
  width = 400, 
  height = 300, 
  className = '',
  message = 'Product Not Found',
  subMessage = "The product you're looking for doesn't exist or has been removed"
}) => {
  return (
    <div style={{ textAlign: 'center' }}>
      <svg
        width={width}
        height={height}
        viewBox="0 0 400 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
      >
        {/* Empty shopping cart */}
        <circle cx="200" cy="120" r="50" stroke="#CBD5E1" strokeWidth="4" fill="none" />
        <path
          d="M160 150 L140 200 L260 200 L240 150"
          stroke="#CBD5E1"
          strokeWidth="4"
          fill="none"
        />
        
        {/* Question marks floating */}
        <text x="120" y="80" fontSize="40" fill="#94A3B8" opacity="0.3">?</text>
        <text x="280" y="100" fontSize="60" fill="#94A3B8" opacity="0.3">?</text>
        <text x="180" y="40" fontSize="30" fill="#94A3B8" opacity="0.3">?</text>
        
        {/* Main X */}
        <line
          x1="150"
          y1="70"
          x2="250"
          y2="170"
          stroke="#EF4444"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.7"
        />
        <line
          x1="250"
          y1="70"
          x2="150"
          y2="170"
          stroke="#EF4444"
          strokeWidth="8"
          strokeLinecap="round"
          opacity="0.7"
        />
        
        {/* Main message */}
        <text
          x="200"
          y="240"
          fontSize="24"
          fill="#1E293B"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
          fontWeight="bold"
        >
          {message}
        </text>
        
        {/* Sub message */}
        <text
          x="200"
          y="270"
          fontSize="14"
          fill="#64748B"
          textAnchor="middle"
          fontFamily="Arial, sans-serif"
        >
          {subMessage}
        </text>
      </svg>
    </div>
  );
};

export default ProductNotFoundWithText;