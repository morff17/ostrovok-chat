import React, { useState, useRef, useEffect } from 'react';
import { mockChatHistory } from './mockData';
import {
    Send,
    Bot,
    User,
    MapPin,
    Star,
    CheckCircle,
    AlertCircle,
    Menu,
    Plus,
    MessageSquare,
    History,
    LogOut,
    Compass
} from 'lucide-react';

function App() {
    const [messages, setMessages] = useState(mockChatHistory);
    const [inputValue, setInputValue] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const messagesEndRef = useRef(null);

    const [chatSessions] = useState([
        { id: '1', title: 'Поездка в Сочи на выходные', date: 'Сегодня' },
        { id: '2', title: 'Отели в центре Москвы', date: 'Сегодня' },
        { id: '3', title: 'Семейный отдых в Казани', date: 'Недавние' },
        { id: '4', title: 'Экскурсии и гид в Калининграде', date: 'Недавние' },
        { id: '5', title: 'Горнолыжные отели Роза Хутор', date: 'Недавние' },
        { id: '6', title: 'Новый год на Байкале 2027', date: 'Недавние' },
    ]);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [messages]);

    const handleNewChat = () => {
        if (mockChatHistory && mockChatHistory.length > 0) {
            setMessages([mockChatHistory[0]]);
        } else {
            setMessages([
                {
                    id: "msg-init",
                    sender: "agent",
                    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    message: "Привет! Я твой интеллектуальный гид от Островка. Куда планируете отправиться и какой у вас бюджет?",
                    cards: [],
                    suggestedActions: ["В Сочи на выходные", "Подобрать отель в Москве"]
                }
            ]);
        }
        setInputValue('');
    };

    useEffect(() => {
        const handleKeyDown = (e) => {
            if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'n') {
                e.preventDefault();
                handleNewChat();
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, []);

    const handleSend = (textToSend) => {
        const text = textToSend || inputValue;
        if (!text.trim()) return;

        const userMessage = {
            id: `msg-user-${Date.now()}`,
            sender: 'user',
            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            message: text
        };

        setMessages(prev => [...prev, userMessage]);
        if (!textToSend) setInputValue('');

        setTimeout(() => {
            const agentMessage = {
                id: `msg-agent-${Date.now()}`,
                sender: 'agent',
                timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                message: `Вы выбрали действие: "${text}". Я пересчитываю параметры маршрута...`,
                cards: [],
                suggestedActions: ["Вернуться к подбору", "Изменить параметры поиска"]
            };
            setMessages(prev => [...prev, agentMessage]);
        }, 1000);
    };

    return (
        <div className="flex h-screen w-screen overflow-hidden bg-ostrovok-bgLight text-slate-800 antialiased">

            {/* 1. ЛЕВАЯ ПАНЕЛЬ: СВЕТЛЫЙ ДЭШБОРД (ИСТОРИЯ ЧАТОВ) */}
            <aside className={`bg-white border-r border-slate-200 w-72 shrink-0 flex flex-col justify-between transition-all duration-300 z-40 fixed md:static h-full ${
                isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-0 md:min-w-0 md:overflow-hidden'
            }`}>
                <div className="flex flex-col pt-4 px-3 overflow-y-auto flex-1 scrollbar-none">
                    <button
                        onClick={handleNewChat}
                        className="flex items-center justify-between w-full border border-slate-200 rounded-xl px-4 py-3 text-sm font-semibold text-slate-700 bg-slate-50 hover:bg-emerald-50 hover:border-emerald-300 hover:text-emerald-950 transition mb-6 shadow-sm group"
                    >
            <span className="flex items-center gap-2">
              <Plus size={16} className="text-emerald-600 group-hover:rotate-90 transition-transform" />
              Новый чат
            </span>
                        <span className="text-[10px] bg-white text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 shadow-sm font-normal">Ctrl N</span>
                    </button>

                    <div className="space-y-6 text-xs">
                        <div>
                            <div className="text-slate-400 font-bold px-2 mb-2 uppercase tracking-wider text-[10px]">Сегодня</div>
                            <div className="space-y-1">
                                {chatSessions.filter(s => s.date === 'Сегодня').map(session => (
                                    <div key={session.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50/60 text-slate-600 hover:text-emerald-950 font-medium cursor-pointer transition truncate">
                                        <MessageSquare size={14} className="text-slate-400 shrink-0" />
                                        <span className="truncate">{session.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>

                        <div>
                            <div className="text-slate-400 font-bold px-2 mb-2 uppercase tracking-wider text-[10px]">Недавние</div>
                            <div className="space-y-1">
                                {chatSessions.filter(s => s.date !== 'Сегодня').map(session => (
                                    <div key={session.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl hover:bg-emerald-50/60 text-slate-600 hover:text-emerald-950 font-medium cursor-pointer transition truncate">
                                        <History size={14} className="text-slate-400 shrink-0" />
                                        <span className="truncate">{session.title}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-3 border-t border-slate-200 bg-slate-50/50 flex items-center justify-between">
                    <div className="flex items-center gap-2 truncate">
                        <div className="w-8 h-8 rounded-full bg-ostrovok-blue text-white flex items-center justify-center font-bold text-sm shrink-0 shadow-sm">
                            Д
                        </div>
                        <div className="flex flex-col truncate text-xs">
                            <span className="text-slate-800 font-semibold truncate">Даша</span>
                            <span className="text-slate-400 text-[10px] truncate">dasha@ostrovok.ru</span>
                        </div>
                    </div>
                    <button className="text-slate-400 hover:text-rose-600 p-1.5 rounded-lg hover:bg-rose-50 transition">
                        <LogOut size={16} />
                    </button>
                </div>
            </aside>

            {/* 2. ПРАВАЯ ЧАСТЬ: РАБОЧАЯ ОБЛАСТЬ ЧАТА */}
            <div className="flex-1 flex flex-col h-full relative min-w-0 bg-[#f8fafc]">

                {/* ШАПКА РАБОЧЕЙ ЗОНЫ */}
                <header className="bg-white border-b border-slate-200/80 px-4 py-3 flex items-center justify-between sticky top-0 z-30">
                    <div className="flex items-center gap-3">
                        <button
                            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                            className="text-slate-500 hover:bg-slate-100 p-2 rounded-xl transition"
                            title={isSidebarOpen ? "Скрыть панель" : "Показать панель"}
                        >
                            <Menu size={20} />
                        </button>
                        <div className="text-ostrovok-blue font-black text-xl tracking-tight flex items-center">
                            Островок!
                            <span className="text-[10px] bg-ostrovok-lightGreen border border-emerald-300 text-emerald-900 px-2 py-0.5 rounded-full ml-2 font-black uppercase tracking-wider shadow-sm">
                AI Агент
              </span>
                        </div>
                    </div>

                    <div className="flex items-center space-x-3 text-xs md:text-sm font-medium">
            <span className="hidden sm:flex text-slate-600 hover:text-ostrovok-blue cursor-pointer items-center gap-1 transition">
              <Compass size={16} className="text-emerald-500" /> Направления
            </span>
                        <button className="text-ostrovok-blue border border-ostrovok-blue/30 px-3 py-1.5 rounded-xl hover:bg-blue-50 transition font-semibold">
                            Войти
                        </button>
                    </div>
                </header>

                {/* ОБЛАСТЬ СООБЩЕНИЙ */}
                <main className="flex-1 overflow-y-auto overflow-x-hidden px-4 py-6 md:px-8 w-full flex flex-col">
                    <div className="max-w-4xl w-full mx-auto flex-1 flex flex-col space-y-6">
                        {messages.map((msg) => (
                            <div key={msg.id} className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>

                                <div className="flex items-start space-x-3 max-w-[85%] md:max-w-[75%]">
                                    {msg.sender === 'agent' && (
                                        <div className="bg-ostrovok-blue p-2 rounded-xl text-white shrink-0 mt-0.5 shadow-md shadow-blue-500/10 border border-blue-400/20">
                                            <Bot size={16} />
                                        </div>
                                    )}

                                    <div className={`rounded-2xl px-4 py-3 shadow-sm border ${
                                        msg.sender === 'user'
                                            ? 'bg-ostrovok-blue text-white rounded-tr-none border-blue-600'
                                            : 'bg-white text-slate-800 rounded-tl-none border-slate-200/70'
                                    }`}>
                                        <p className="text-sm md:text-[15px] leading-relaxed whitespace-pre-line">{msg.message}</p>
                                        <span className={`text-[9px] block mt-1.5 text-right ${msg.sender === 'user' ? 'text-blue-200' : 'text-slate-400'}`}>
                      {msg.timestamp}
                    </span>
                                    </div>
                                </div>

                                {/* КАРТОЧКИ ОТЕЛЕЙ */}
                                {msg.cards && msg.cards.length > 0 && (
                                    <div className="w-full pl-0 md:pl-10 my-3">
                                        <div className="flex space-x-4 overflow-x-auto pb-4 pt-1 scrollbar-thin snap-x snap-mandatory">
                                            {msg.cards.map((card, index) => (
                                                <div key={index} className="bg-white rounded-2xl border border-slate-200/80 shadow-sm min-w-[290px] max-w-[320px] md:min-w-[350px] shrink-0 snap-start overflow-hidden flex flex-col justify-between transform hover:translate-y-[-2px] transition-all duration-200 hover:shadow-md">

                                                    <div className="p-4 border-b border-slate-100 bg-slate-50/60">
                                                        <div className="flex justify-between items-start">
                              <span className="bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold px-2 py-0.5 rounded-md">
                                Совпадение: {Math.round(card.score * 100)}%
                              </span>
                                                            <div className="flex items-center text-amber-500 bg-amber-50 px-1.5 py-0.5 rounded text-xs font-bold border border-amber-200/50">
                                                                <Star size={11} className="fill-amber-500 mr-1 text-amber-500" />
                                                                {card.hotel.stars}★
                                                            </div>
                                                        </div>
                                                        <h4 className="font-bold text-base md:text-lg mt-2 text-slate-900 tracking-tight">{card.hotel.name}</h4>
                                                        <p className="text-xs text-slate-500 flex items-center mt-1">
                                                            <MapPin size={12} className="mr-1 text-emerald-500" />
                                                            {card.hotel.destination} • {card.hotel.distanceToBeachM}м от пляжа
                                                        </p>
                                                    </div>

                                                    <div className="p-4 space-y-3 flex-1 text-xs md:text-sm">
                                                        <div className="space-y-1">
                                                            <div className="text-emerald-600 font-bold flex items-center gap-1.5 mb-1">
                                                                <CheckCircle size={14} className="text-emerald-500" /> Почему подходит:
                                                            </div>
                                                            {card.reasons.map((reason, i) => (
                                                                <div key={i} className="text-slate-600 pl-5 relative before:content-['•'] before:absolute before:left-1 before:text-emerald-500 before:font-bold">
                                                                    {reason}
                                                                </div>
                                                            ))}
                                                        </div>

                                                        {card.tradeoffs && card.tradeoffs.length > 0 && (
                                                            <div className="space-y-1 pt-1">
                                                                <div className="text-amber-700 font-bold flex items-center gap-1.5 mb-1">
                                                                    <AlertCircle size={14} className="text-amber-500" /> Обратите внимание:
                                                                </div>
                                                                {card.tradeoffs.map((tradeoff, i) => (
                                                                    <div key={i} className="text-slate-600 pl-5 relative before:content-['•'] before:absolute before:left-1 before:text-amber-500 before:font-bold">
                                                                        {tradeoff}
                                                                    </div>
                                                                ))}
                                                            </div>
                                                        )}

                                                        <div className="flex flex-wrap gap-1 pt-2">
                                                            {card.hotel.amenities.map((amenity, i) => (
                                                                <span key={i} className="bg-emerald-50 border border-emerald-100 text-emerald-700 text-[10px] font-medium px-2 py-0.5 rounded-full">
                                  #{amenity}
                                </span>
                                                            ))}
                                                        </div>
                                                    </div>

                                                    <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                                                        <div>
                                                            <div className="text-[11px] text-slate-400">Итого за поездку</div>
                                                            <div className="text-lg font-black text-slate-900">{card.totalPrice.toLocaleString()} ₽</div>
                                                            <div className="text-[10px] text-slate-400">{card.hotel.pricePerNight} ₽ / ночь</div>
                                                        </div>
                                                        <button className="bg-ostrovok-blue hover:bg-blue-700 text-white font-bold text-xs md:text-sm px-4 py-2 rounded-xl shadow-sm hover:shadow transition duration-150">
                                                            Выбрать
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* БЫСТРЫЕ ПОДСКАЗКИ */}
                                {msg.suggestedActions && msg.suggestedActions.length > 0 && (
                                    <div className="w-full flex flex-wrap gap-2 pl-0 md:pl-10 my-1 justify-start">
                                        {msg.suggestedActions.map((action, i) => (
                                            <button
                                                key={i}
                                                onClick={() => handleSend(action)}
                                                className="bg-white hover:bg-emerald-50 border border-slate-200 hover:border-emerald-300 text-slate-700 hover:text-emerald-800 text-xs md:text-sm px-3.5 py-1.5 rounded-full transition-all shadow-sm font-medium"
                                            >
                                                {action}
                                            </button>
                                        ))}
                                    </div>
                                )}

                            </div>
                        ))}
                        <div ref={messagesEndRef} />
                    </div>
                </main>

                {/* ОСТРОВ ДЛЯ НАПИСАНИЯ ТЕКСТА */}
                <footer className="p-4 md:p-6 bg-gradient-to-t from-[#f8fafc] via-[#f8fafc] to-transparent sticky bottom-0 z-30">
                    <form
                        onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                        className="max-w-3xl w-full mx-auto relative bg-white border border-slate-200 rounded-2xl shadow-lg focus-within:border-emerald-400 focus-within:ring-2 focus-within:ring-emerald-100 transition-all p-2 flex items-center gap-2"
                    >
                        <input
                            type="text"
                            value={inputValue}
                            onChange={(e) => setInputValue(e.target.value)}
                            placeholder="Сообщение для Островок AI..."
                            className="flex-1 bg-transparent px-3 py-2 text-sm md:text-base focus:outline-none text-slate-800"
                        />
                        <button
                            type="submit"
                            disabled={!inputValue.trim()}
                            className={`p-2.5 rounded-xl transition-all flex items-center justify-center shrink-0 ${
                                inputValue.trim()
                                    ? 'bg-ostrovok-blue text-white shadow-md shadow-blue-500/20 hover:bg-blue-700'
                                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
                            }`}
                        >
                            <Send size={16} />
                        </button>
                    </form>
                    <div className="text-[10px] text-center text-slate-400 mt-2">
                        Интеллектуальный агент Островок может совершать ошибки. Проверяйте важную информацию.
                    </div>
                </footer>

            </div>
        </div>
    );
}

export default App;
