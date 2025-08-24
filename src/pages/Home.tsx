import React, { useState } from "react";
import { Link } from "react-router-dom";
import riceyLogo from "../assets/ricey-logo2.svg";
import cookFalseSvg from "../assets/cook=false.svg";
import cookTrueSvg from "../assets/cook=true.svg";

export default function Home() {
  const [isButtonPressed, setIsButtonPressed] = useState(false);

  return (
    <div className="h-screen bg-[#fcfbf4] relative overflow-hidden font-pixel" style={{
      imageRendering: 'crisp-edges'
    }}>
      <style>
        {`
          img {
            image-rendering: crisp-edges;
            image-rendering: -webkit-optimize-contrast;
            transform: translateZ(0);
            backface-visibility: hidden;
          }
        `}
      </style>
      {/* Background Pattern - Circles 48px */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAAAXNSR0IArs4c6QAAAe1JREFUaAXtmaFOxEAQhg9QCAQYQJOQ4PEnQfAAvAASBe+A4gwvwROARoMkIZCgcJCABAf/17SEkmmvTefolswkf8XudPvP39vtzNxoZNupho/tqV5Gj/TUifXkeWtQY1vCY8VcH8NwgVMj25TXi7DSyPtvnJZzTnCrtUXNEu1+rVc/k3D6FOBoGtHhcG7OpjEINwQuvQk2x6XAzyZF5UWrZHCEK5wnc7qww4nqSngThmDsibGwMQSywTEUCAVCgVAgFPi/CpBKzMJIxX9+6otU5dX7YQveC2o9kq0LYU34EJaEHeFEeBJuhWSNdJeUvJTu5mwZ400km66jPAQrC458jgDxTcoal3xizZtwK1mrivq26rBhb4SHBjficy1wT2fzCoDC4q4FG3xdihGvAFpw93X1CoDN27hvk/tyTzLW2yb2VICjkSNy2jGK8skdo4UQZt8mn+T4JEDXD9ksciHUPRM4VouTif2xLRwKyQcgjqPffRt+NkPqOxFDWCgQCoQCoUAoEApMVYC2Cn9orwrPwrswBKPvtCvsUdCsCwfCvZBsmituhcERrnCG+7cl37cRUzJZUnK4mkYxgkOKbwJOZLV1BZOmnfs22YrdL5Ulq1XUu/ZtunPPVhjravadrAC4w61vkz2++6Wy7/QFbrhQvjGdAq4AAAAASUVORK5CYII=")`,
          backgroundSize: '48px 48px'
        }}></div>
      </div>

      {/* Top Logo - Frame 12 */}
      <div className="absolute top-8 right-8 z-10">
        <img src={riceyLogo} alt="Ricey Logo" className="w-[48px] h-[48px] object-contain" style={{ imageRendering: 'crisp-edges' }} />
      </div>

      {/* Main Content - Frame 2 */}
      <div className="relative z-20 flex flex-col items-center justify-center h-screen">
        <div className="w-[207px] flex flex-col items-center space-y-8">
          {/* Header */}
          <header className="text-center w-[197px] h-[160px] flex flex-col justify-center">
            <div className="text-6xl font-bold text-black mb-2 leading-none">ricey</div>
            <div className="text-lg text-black font-normal">your rice guide</div>
          </header>

          {/* Main Logo - ricey-logo */}
          <div className="w-[120px] h-[180px] flex items-center justify-center">
            <img src={riceyLogo} alt="Ricey Logo" className="w-full h-full" />
          </div>

          {/* Main Action Button - Sharp Button */}
          <div className="w-[207px] h-[50.63px]">
            <Link to="/cooking">
              <div 
                className="w-[163px] h-[42px] mx-auto relative"
                onMouseDown={() => setIsButtonPressed(true)}
                onMouseUp={() => setIsButtonPressed(false)}
                onMouseLeave={() => setIsButtonPressed(false)}
                onTouchStart={() => setIsButtonPressed(true)}
                onTouchEnd={() => setIsButtonPressed(false)}
              >
                <img 
                  src={isButtonPressed ? cookTrueSvg : cookFalseSvg} 
                  alt="Let's Cook!" 
                  className="w-full h-full cursor-pointer"
                  style={{ 
                    imageRendering: 'crisp-edges',
                    transform: 'translateZ(0)'
                  }}
                />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <span className="text-white font-pixel text-lg font-bold">let's cook rice</span>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>




    </div>
  );
}
