import { useState, useRef, useEffect } from 'react'

interface Message {
  id: string
  text: string
  isUser: boolean
  timestamp: Date
}

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: "Hello! I'm MA Assistant, your AI consultant. How can I help you learn more about our services today?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus()
    }
  }, [isOpen])

  const generateResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()

    // Service-related responses
    if (message.includes('investment') || message.includes('investing')) {
      return "Our investment consulting services help you make informed decisions about portfolio management, risk assessment, and long-term financial growth. We specialize in personalized investment strategies tailored to your goals and risk tolerance. Would you like to schedule a consultation?"
    }

    if (message.includes('business development') || message.includes('growth')) {
      return "Business development is our expertise! We help companies expand their market presence, optimize operations, and achieve sustainable growth. Our strategies include market analysis, partnership development, and operational efficiency improvements."
    }

    if (message.includes('tax') || message.includes('customs')) {
      return "Our tax and customs consulting ensures compliance while maximizing your financial efficiency. We handle tax planning, customs regulations, international trade compliance, and duty optimization. Let us help you navigate complex tax landscapes."
    }

    if (message.includes('marketing') || message.includes('brand')) {
      return "Digital marketing is crucial for business success. We offer comprehensive marketing strategies including content marketing, SEO, social media management, and brand development. Our data-driven approach delivers measurable results."
    }

    if (message.includes('team') || message.includes('staff')) {
      return "Our expert team includes seasoned consultants with decades of combined experience. Meet our CEO Alebachew Sitotaw Yimer, Deputy CEO Melsew Hailemariam Yassin, and Head of Business Development Tiruwork Tizazu Liyew. Each brings unique expertise to deliver exceptional results."
    }

    if (message.includes('contact') || message.includes('reach') || message.includes('phone')) {
      return "You can reach us at info@maconsulting.com or call +1 (555) 123-4567. We're located at 123 Business St, City, State 12345. Our team typically responds within 2 hours during business hours."
    }

    if (message.includes('price') || message.includes('cost') || message.includes('fee')) {
      return "Our pricing is customized based on your specific needs and project scope. We offer flexible consulting packages starting from basic advisory services to comprehensive transformation programs. Let's discuss your requirements to provide an accurate quote."
    }

    if (message.includes('blog') || message.includes('article') || message.includes('news')) {
      return "Check out our latest insights on our blog! We cover topics like investment trends, business development strategies, tax optimization, and industry best practices. Our thought leadership content is designed to help you stay ahead of the curve."
    }

    // General responses
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! Welcome to Ma Services Solution. I'm here to help you learn about our professional services. What would you like to know about investment consulting, business development, tax services, or our other offerings?"
    }

    if (message.includes('thank') || message.includes('thanks')) {
      return "You're welcome! I'm glad I could help. Feel free to ask if you have any other questions about our consulting services. We're here to support your business success!"
    }

    // Default response
    return "That's an interesting question! As your AI consultant, I'm here to help with information about our investment consulting, business development, tax & customs services, marketing strategies, and more. Could you tell me more about what you're looking for?"
  }

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    setIsTyping(true)

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateResponse(inputValue),
        isUser: false,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Widget Button */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <button
            onClick={() => setIsOpen(true)}
            className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 animate-bounce hover:animate-none btn-3d flex items-center justify-center group"
          >
            <svg className="w-8 h-8 text-white group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
            {/* Notification dot */}
            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full animate-pulse"></div>
          </button>
        )}
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-96 h-[500px] bg-white rounded-2xl shadow-2xl z-50 animate-scale-in border border-gray-200 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-500 to-purple-600 text-white p-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                <span className="text-lg">🤖</span>
              </div>
              <div>
                <h3 className="font-semibold">MA Assistant</h3>
                <p className="text-sm opacity-90">AI Consultant • Online</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 p-4 space-y-4 overflow-y-auto h-[350px] bg-gray-50">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-2xl ${
                    message.isUser
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-white text-gray-800 shadow-md'
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${message.isUser ? 'text-blue-100' : 'text-gray-500'}`}>
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="card-message">
                  <div className="flex space-x-1">
                    <div className="typing-dot"></div>
                    <div className="typing-dot animation-delay-100"></div>
                    <div className="typing-dot animation-delay-200"></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white">
            <div className="flex space-x-2">
              <input
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me about our services..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 md:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  )
}

export default ChatWidget
