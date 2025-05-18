'use client'
import { useState } from 'react';

export default function AppleAdventure() {
    const [step, setStep] = useState(0);
    const [answer, setAnswer] = useState('');
    const [feedback, setFeedback] = useState('');
    const [showConfetti, setShowConfetti] = useState(false);
    const [currentApples, setCurrentApples] = useState(8);

    const storySteps = [
        {
            text: "Lilian loves apples! Every day, her mother gives her 8 apples.",
            apples: 8,
            action: null,
            question: null,
            correctAnswer: null
        },
        {
            text: "It's sharing day! Lilian gave 3 of her apples to her friends.",
            apples: currentApples - 3,
            action: "subtract",
            question: `${currentApples} apples - 3 apples = ?`,
            correctAnswer: currentApples - 3
        },
        {
            text: "Her kind Aunt Jolly gave her 4 more apples for her behaviour!",
            apples: currentApples + 4,
            action: "add",
            question: `${currentApples} apples + 4 apples = ?`,
            correctAnswer: currentApples + 4
        },
        {
            text: "Oh no! A big bad bully stole 5 of Lilian's apples!",
            apples: currentApples - 5,
            action: "subtract",
            question: `${currentApples} apples - 5 apples = ?`,
            correctAnswer: currentApples - 5
        },
        {
            text: `Lilian now has ${currentApples} apples left!`,
            apples: currentApples,
            action: null,
            question: "How does Lilian feel today?",
            correctAnswer: "angry"
        }
    ];

    const emotions = ["Happy", "Angry", "Sad", "Excited"];

    const checkAnswer = () => {
        if (step < 3) { // Math questions
            if (parseInt(answer) === storySteps[step].correctAnswer) {
                setFeedback("Correct! 🎉");
                setShowConfetti(true);
                // Update apple count when answer is correct
                setCurrentApples(storySteps[step].correctAnswer);
                setTimeout(() => {
                    setShowConfetti(false);
                    setStep(step + 1);
                    setAnswer('');
                    setFeedback('');
                }, 1500);
            } else {
                setFeedback("Try again! You can do it!");
            }
        } else if (step === 3) { // Final math question
            if (parseInt(answer) === storySteps[step].correctAnswer) {
                setFeedback("Correct! 🎉");
                setShowConfetti(true);
                // Update apple count when answer is correct
                setCurrentApples(storySteps[step].correctAnswer);
                setTimeout(() => {
                    setShowConfetti(false);
                    setStep(step + 1);
                    setAnswer('');
                    setFeedback('');
                }, 1500);
            } else {
                setFeedback("Almost there! Think again.");
            }
        } else { // Emotion question
            if (answer.toLowerCase() === "angry") {
                setFeedback("That's right! Lilian is angry because she has less than 8 apples.");
                setShowConfetti(true);
            } else {
                setFeedback("Remember: Lilian gets angry when she has less than 8 apples!");
            }
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    };

    const renderApples = (count) => {
        return (
            <div className="flex flex-wrap justify-center gap-2 my-4">
                {Array.from({ length: count }).map((_, i) => (
                    <div key={i} className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center 
                                        shadow-lg border-2 border-red-700 animate-bounce" 
                        style={{ animationDelay: `${i * 0.1}s` }}>
                        <div className="w-2 h-2 bg-green-600 rounded-full absolute -top-1 -right-1"></div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-b from-blue-100 to-purple-100 p-6">
            {showConfetti && (
                <div className="fixed inset-0 flex items-center justify-center pointer-events-none">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div 
                            key={i}
                            className="absolute w-4 h-4 bg-yellow-400 rounded-full animate-confetti"
                            style={{
                                left: `${Math.random() * 100}vw`,
                                animationDelay: `${Math.random() * 0.5}s`,
                                animationDuration: `${1 + Math.random() * 2}s`,
                                transform: `rotate(${Math.random() * 360}deg)`,
                                background: `hsl(${Math.random() * 360}, 100%, 50%)`
                            }}
                        ></div>
                    ))}
                </div>
            )}

            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 animate-fade-in">
                <h1 className="text-3xl font-bold text-center text-purple-600 mb-6">
                    Lilian's Apple Adventure!
                </h1>
                
                <div className="bg-yellow-50 border-2 border-yellow-200 rounded-lg p-4 mb-6">
                    <p className="text-lg font-medium text-gray-800">
                        {storySteps[step].text}
                    </p>
                    {renderApples(currentApples)} {/* Use currentApples instead of storySteps[step].apples */}
                </div>

                {storySteps[step].question && (
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4 mb-6">
                        <p className="text-xl font-bold text-blue-600 mb-2">
                            {storySteps[step].question}
                        </p>
                        
                        {step < 4 ? (
                            <div className="flex items-center gap-2">
                                <input
                                    type="number"
                                    value={answer}
                                    onChange={(e) => setAnswer(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    className="border-2 border-purple-300 rounded-lg px-4 py-2 text-xl w-20"
                                    placeholder="?"
                                />
                                <button
                                    onClick={checkAnswer}
                                    className="bg-purple-500 hover:bg-purple-600 text-white font-bold py-2 px-4 rounded-lg transition transform hover:scale-105 active:scale-95"
                                >
                                    Check
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                <div className="flex flex-wrap gap-2">
                                    {emotions.map(emotion => (
                                        <button
                                            key={emotion}
                                            onClick={() => setAnswer(emotion)}
                                            className={`px-4 py-2 rounded-full font-medium transition ${
                                                answer === emotion 
                                                ? 'bg-red-500 text-white scale-105' 
                                                : 'bg-gray-200 hover:bg-gray-300'
                                            }`}
                                        >
                                            {emotion}
                                        </button>
                                    ))}
                                </div>
                                <button
                                    onClick={checkAnswer}
                                    disabled={!answer}
                                    className={`mt-2 text-white font-bold py-2 px-4 rounded-lg transition ${
                                        answer 
                                        ? 'bg-purple-500 hover:bg-purple-600 transform hover:scale-105 active:scale-95' 
                                        : 'bg-gray-400 cursor-not-allowed'
                                    }`}
                                >
                                    Check my answer
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {feedback && (
                    <div className={`p-3 rounded-lg text-center font-bold ${
                        feedback.includes("Correct") || feedback.includes("right") 
                        ? 'bg-green-100 text-green-700' 
                        : 'bg-red-100 text-red-700'
                    }`}>
                        {feedback}
                    </div>
                )}

                {step < storySteps.length - 1 && !storySteps[step].question && (
                    <button
                        onClick={() => setStep(step + 1)}
                        className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition transform hover:scale-105 active:scale-95"
                    >
                        Continue the Story! →
                    </button>
                )}

                {step === storySteps.length - 1 && (
                    <button
                        onClick={() => {
                            setStep(0);
                            setAnswer('');
                            setFeedback('');
                            setCurrentApples(8); // Reset apple count
                        }}
                        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-4 rounded-lg text-lg transition transform hover:scale-105 active:scale-95"
                    >
                        Play Again! 🔄
                    </button>
                )}
            </div>

            <style jsx global>{`
                @keyframes confetti {
                    0% { transform: translateY(0) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
                .animate-confetti {
                    animation: confetti linear forwards;
                }
                .animate-fade-in {
                    animation: fadeIn 0.5s ease-in;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
            `}</style>
        </div>
    );
}