// Login and Sign up To switch between the two
'use client'
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { 
    AuthIllustrationProps, 
    AuthHeaderProps, 
    AuthErrorProps,
    AuthInputProps,
    AuthButtonProps,
    AuthToggleProps,
    SkillLevelsProps,
} from '../../auth/AuthType';

export function AuthIllustration({ title, description, imageSrc }: AuthIllustrationProps) {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="w-full md:w-1/2 bg-gradient-to-br from-green to-fontgreen p-12 flex flex-col justify-center text-white"
        >
        <h2 className="text-4xl font-bold mb-4">{title}</h2>
        <p className="text-green-100 mb-8">{description}</p>
        <div className="relative h-64">
            <Image
            src={imageSrc}
            alt="Auth Illustration"
            fill
            className="object-contain"
            />
        </div>
        </motion.div>
    );
    }

    export function AuthFormContainer({ children }: { children: React.ReactNode }) {
    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="w-full md:w-1/2 p-12"
        >
        {children}
        </motion.div>
    );
    }

    export function AuthHeader({ title, subtitle }: AuthHeaderProps) {
    return (
        <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-fontgreen">{title}</h1>
        <p className="text-gray-600 mt-2">{subtitle}</p>
        </div>
    );
    }

    export function AuthError({ error }: AuthErrorProps) {
    return (
        <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="mb-4 p-3 bg-red-100 text-red-700 rounded-md text-sm"
        >
        {error}
        </motion.div>
    );
    }

    export function AuthInput({
    label,
    id,
    name,
    type,
    value,
    onChange,
    placeholder,
    required = true,
    delay = 0
    }: AuthInputProps) {
    return (
        <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay }}
        >
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
            {label}
        </label>
        <input
            id={id}
            name={name || id}
            type={type}
            value={value}
            onChange={onChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-fontgreen focus:border-fontgreen outline-none transition duration-300"
            placeholder={placeholder}
            required={required}
        />
        </motion.div>
    );
    }

    export function AuthRememberForgot({ delay = 0 }: { delay?: number }) {
    return (
        <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay }}
        className="flex items-center justify-between"
        >
        <div className="flex items-center">
            <input
            id="remember-me"
            name="remember-me"
            type="checkbox"
            className="h-4 w-4 text-fontgreen focus:ring-fontgreen border-gray-300 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-700">
            Remember me
            </label>
        </div>
        <Link href="/forgot-password" className="text-sm text-green hover:text-fontgreen transition duration-300">
            Forgot password?
        </Link>
        </motion.div>
    );
    }

    export function AuthButton({ loading, text, loadingText, delay = 0 }: AuthButtonProps) {
    return (
        <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay }}
        >
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 bg-gradient-to-r from-green to-fontgreen text-white font-semibold rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-fontgreen focus:ring-offset-2 transition duration-300 ${
            loading ? 'opacity-70 cursor-not-allowed' : ''
            }`}
        >
            {loading ? (
            <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {loadingText}
            </span>
            ) : (
            text
            )}
        </motion.button>
        </motion.div>
    );
    }

    export function AuthToggle({ text, buttonText, onToggle, delay = 0 }: AuthToggleProps) {
    return (
        <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay }}
        className="mt-8 text-center"
        >
        <p className="text-sm text-gray-600">
            {text}{' '}
            <button
            onClick={onToggle}
            className="text-green hover:text-fontgreen font-medium transition duration-300 cursor-pointer"
            >
            {buttonText}
            </button>
        </p>
        </motion.div>
    );
    }

    export function SkillLevels({ levels, selectedLevel, onSelect }: SkillLevelsProps) {
    return (
        <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
        >
        <label className="block text-sm font-medium text-gray-700 mb-3">
            Select Your Skill Level
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {levels.map((level, index) => (
            <motion.div
                key={level.id}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                whileHover={{ y: -5 }}
                onClick={() => onSelect(level.id)}
                className={`border-2 rounded-xl p-4 cursor-pointer transition-all duration-300 ${
                selectedLevel === level.id
                    ? 'border-fontgreen bg-green-50 shadow-md'
                    : 'border-gray-200 hover:border-green'
                }`}
            >
                <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 mb-3 relative">
                    <Image
                    src={level.image}
                    alt={level.name}
                    fill
                    className="object-contain"
                    />
                </div>
                <h3 className="font-medium text-gray-900">{level.name}</h3>
                <p className="text-sm text-gray-500 mt-1">{level.description}</p>
                </div>
            </motion.div>
            ))}
        </div>
        </motion.div>
    );
    }

    export function AuthTermsCheckbox({ delay = 0 }: { delay?: number }) {
    return (
        <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay }}
        className="flex items-center"
        >
        <input
            id="terms"
            name="terms"
            type="checkbox"
            className="h-4 w-4 text-fontgreen focus:ring-fontgreen border-gray-300 rounded"
            required
        />
        <label htmlFor="terms" className="ml-2 block text-sm text-gray-700">
            I agree to the{' '}
            <Link href="/terms" className="text-green hover:text-fontgreen transition duration-300">
            Terms and Conditions
            </Link>
        </label>
        </motion.div>
    );
}