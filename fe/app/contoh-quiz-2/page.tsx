'use client'
import { useState } from 'react';
import { motion } from 'framer-motion';
import Confetti from 'react-confetti';

export default function GeometryAdventure() {
    const [step, setStep] = useState(0);
    const [score, setScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [draggedProperty, setDraggedProperty] = useState(null);

    // Data pembelajaran
    const lessons = [
        {
        title: "Bangun Datar",
        question: "Seret sifat ke bentuk yang sesuai!",
        shapes: [
            { id: 1, name: "Persegi", type: "square", color: "bg-blue-500" },
            { id: 2, name: "Segitiga", type: "triangle", color: "bg-red-500" },
            { id: 3, name: "Lingkaran", type: "circle", color: "bg-green-500" }
        ],
        properties: [
            { id: 1, text: "4 sisi sama panjang", correctShape: "square" },
            { id: 2, text: "3 sudut", correctShape: "triangle" },
            { id: 3, text: "Tidak memiliki sudut", correctShape: "circle" }
        ]
        },
        {
        title: "Bangun Ruang",
        question: "Identifikasi bentuk 3D berikut!",
        shapes: [
            { name: "Kubus", answer: "kubus" },
            { name: "Tabung", answer: "tabung" },
            { name: "Bola", answer: "bola" }
        ]
        }
    ];

    // Handle drag and drop
    const handleDrop = (shapeType) => {
        if (draggedProperty && draggedProperty.correctShape === shapeType) {
        setScore(score + 10);
        setShowConfetti(true);
        setTimeout(() => setShowConfetti(false), 2000);
        }
    };

    // Render bangun datar dengan SVG
    const renderShape = (shapeType) => {
        switch (shapeType) {
        case "square":
            return (
            <svg width="80" height="80">
                <rect width="80" height="80" fill="#3b82f6" />
            </svg>
            );
        case "triangle":
            return (
            <svg width="80" height="80">
                <polygon points="40,0 0,80 80,80" fill="#ef4444" />
            </svg>
            );
        case "circle":
            return (
            <svg width="80" height="80">
                <circle cx="40" cy="40" r="40" fill="#10b981" />
            </svg>
            );
        default:
            return null;
        }
    };

    // Render bangun ruang dengan CSS 3D
    const render3DShape = (shapeName) => {
        return (
        <div className="w-32 h-32 mx-auto my-4">
            {shapeName === "kubus" && (
            <div className="cube">
                {['front', 'back', 'left', 'right', 'top', 'bottom'].map((face) => (
                <div key={face} className={`face ${face}`}></div>
                ))}
            </div>
            )}
            {shapeName === "tabung" && (
            <div className="cylinder">
                <div className="top"></div>
                <div className="side"></div>
            </div>
            )}
            {shapeName === "bola" && (
            <div className="sphere"></div>
            )}
        </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-cyan-50 to-indigo-100 p-6">
        {showConfetti && <Confetti recycle={false} numberOfPieces={200} />}

        <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
            <h1 className="text-3xl font-bold text-center text-indigo-600 mb-2">
            Petualangan Geometri
            </h1>
            <p className="text-center text-gray-600 mb-6">Skor: {score}</p>

            {/* Konten Pembelajaran */}
            <div className="space-y-6">
            <h2 className="text-2xl font-semibold text-indigo-600">
                {lessons[step].title}
            </h2>
            <p className="text-lg">{lessons[step].question}</p>

            {step === 0 && (
                <>
                <div className="flex flex-wrap justify-center gap-6">
                    {lessons[0].shapes.map((shape) => (
                    <div
                        key={shape.id}
                        className={`w-32 h-32 ${shape.color} rounded-lg flex flex-col items-center justify-center p-4`}
                        onDragOver={(e) => e.preventDefault()}
                        onDrop={() => handleDrop(shape.type)}
                    >
                        {renderShape(shape.type)}
                        <p className="text-white font-bold mt-2">{shape.name}</p>
                    </div>
                    ))}
                </div>

                <div className="mt-6 flex flex-wrap gap-3 justify-center">
                    {lessons[0].properties.map((property) => (
                    <motion.div
                        key={property.id}
                        className="px-4 py-2 bg-yellow-200 rounded-full cursor-grab"
                        draggable
                        onDragStart={() => setDraggedProperty(property)}
                        whileDrag={{ opacity: 0.6 }}
                    >
                        {property.text}
                    </motion.div>
                    ))}
                </div>
                </>
            )}

            {step === 1 && (
                <div className="space-y-8">
                {render3DShape("kubus")}
                
                <div className="flex flex-wrap gap-3 justify-center">
                    {lessons[1].shapes.map((shape) => (
                    <button
                        key={shape.name}
                        className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition"
                        onClick={() => {
                        if (shape.answer === "kubus") {
                            setScore(score + 10);
                            setShowConfetti(true);
                            setTimeout(() => setShowConfetti(false), 2000);
                        }
                        }}
                    >
                        {shape.name}
                    </button>
                    ))}
                </div>
                </div>
            )}
            </div>

            {/* Navigasi */}
            <div className="mt-8 flex justify-between">
            <button
                onClick={() => setStep(0)}
                className={`px-4 py-2 rounded-lg ${step === 0 ? 'bg-gray-300 cursor-default' : 'bg-indigo-100 hover:bg-indigo-200'}`}
                disabled={step === 0}
            >
                Bangun Datar
            </button>
            <button
                onClick={() => setStep(1)}
                className={`px-4 py-2 rounded-lg ${step === 1 ? 'bg-gray-300 cursor-default' : 'bg-indigo-100 hover:bg-indigo-200'}`}
                disabled={step === 1}
            >
                Bangun Ruang
            </button>
            </div>
        </div>

        {/* CSS */}
        <style jsx global>{`
            .cube {
            width: 100px;
            height: 100px;
            position: relative;
            transform-style: preserve-3d;
            animation: rotate 15s infinite linear;
            margin: 0 auto;
            }
            .face {
            position: absolute;
            width: 100%;
            height: 100%;
            background: rgba(99, 102, 241, 0.8);
            border: 2px solid white;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 12px;
            color: white;
            }
            .front  { transform: rotateY(0deg) translateZ(50px); }
            .back   { transform: rotateY(180deg) translateZ(50px); }
            .left   { transform: rotateY(-90deg) translateZ(50px); }
            .right  { transform: rotateY(90deg) translateZ(50px); }
            .top    { transform: rotateX(90deg) translateZ(50px); }
            .bottom { transform: rotateX(-90deg) translateZ(50px); }
            
            .cylinder {
            width: 100px;
            height: 150px;
            position: relative;
            margin: 0 auto;
            }
            .cylinder .top {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: rgba(236, 72, 153, 0.8);
            position: absolute;
            top: 0;
            }
            .cylinder .side {
            width: 100px;
            height: 150px;
            background: rgba(236, 72, 153, 0.6);
            border-radius: 50px/75px;
            position: absolute;
            top: 0;
            }
            
            .sphere {
            width: 100px;
            height: 100px;
            border-radius: 50%;
            background: radial-gradient(circle at 30% 30%, #f59e0b, #ef4444);
            margin: 0 auto;
            box-shadow: inset -10px -10px 20px rgba(0,0,0,0.2);
            }
            
            @keyframes rotate {
            from { transform: rotateY(0) rotateX(10deg); }
            to { transform: rotateY(360deg) rotateX(10deg); }
            }
        `}</style>
        </div>
    );
}