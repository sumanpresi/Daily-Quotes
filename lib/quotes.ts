/**
 * Curated quote bank.
 *
 * RULE: nothing here is machine-generated. Every entry traces to a named work,
 * or, where the saying is traditional rather than textually located, `source`
 * says "Attributed" plainly instead of inventing a citation.
 *
 * To extend: append [text, meaning, source] rows to an author() block.
 */

export interface Quote {
  id: string;
  text: string;
  meaning: string;
  author: string;
  country: string;
  era: string;
  source: string;
  sourceUrl: string;
}

const bank: Quote[] = [];

function author(
  name: string,
  country: string,
  era: string,
  sourceUrl: string,
  rows: [string, string, string][],
): void {
  const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  rows.forEach(([text, meaning, source], i) => {
    bank.push({ id: `${slug}-${i + 1}`, text, meaning, author: name, country, era, source, sourceUrl });
  });
}

/* ---------------- Indian philosophy & spiritual leaders ---------------- */

author("Adi Shankaracharya", "India", "c. 788-820 CE", "https://en.wikisource.org/wiki/Vivekachudamani", [
  ["Brahman is real, the world is an appearance, and the self is nothing other than Brahman.", "What endures is the deeper reality behind things, not the surface we take for real.", "Brahmajnanavalimala, verse 20"],
  ["Seek Govinda, seek Govinda, seek Govinda, O fool. Rules of grammar will not save you at the hour of death.", "Cleverness and credentials are no substitute for what actually matters in the end.", "Bhaja Govindam, verse 1"],
  ["A disease is not cured by pronouncing the name of the medicine; it is cured by taking it.", "Knowing the right thing to do changes nothing until you actually do it.", "Vivekachudamani, verse 62"],
  ["Not by yoga, not by philosophy, not by work, not by learning, but by realising one's identity with Brahman is freedom possible.", "No technique substitutes for directly understanding who you really are.", "Vivekachudamani, verse 56"],
  ["The mind alone is the cause of bondage and of liberation for human beings.", "Your own thinking is what traps you, and the only thing that can free you.", "Vivekachudamani, citing Amritabindu Upanishad"],
]);

author("Chanakya", "India", "c. 375-283 BCE", "https://en.wikisource.org/wiki/Arthashastra", [
  ["The happiness of the king lies in the happiness of his subjects; in their welfare lies his welfare.", "A leader's success is measured by how well the people under them are doing.", "Arthashastra, Book 1, Chapter 19"],
  ["Before starting any work, ask yourself three questions: why am I doing it, what may the results be, and will I succeed.", "Think through purpose, consequence and feasibility before committing effort.", "Chanakya Niti, Chapter 1"],
  ["A person should not be too honest. Straight trees are cut first.", "Total openness in a competitive setting can make you the easiest target.", "Chanakya Niti, Chapter 4"],
  ["Education is the best friend. An educated person is respected everywhere.", "Learning is the one asset that travels with you and cannot be taken away.", "Chanakya Niti, Chapter 4"],
  ["As soon as fear approaches near, attack and destroy it.", "Confront what frightens you early, while it is still small.", "Chanakya Niti, Chapter 6"],
]);

author("Gautama Buddha", "India / Nepal", "c. 563-483 BCE", "https://en.wikisource.org/wiki/Dhammapada", [
  ["All that we are is the result of what we have thought; it is founded on our thoughts, it is made up of our thoughts.", "Habitual thinking quietly builds the person you become.", "Dhammapada, verse 1, Max Muller translation"],
  ["Hatred does not cease by hatred at any time; hatred ceases by love. This is an eternal rule.", "Answering hostility with hostility only keeps it alive.", "Dhammapada, verse 5"],
  ["Better than a thousand hollow words is one word that brings peace.", "One useful sentence is worth more than a great deal of talk.", "Dhammapada, verse 100"],
  ["You yourself must make the effort. Buddhas only point the way.", "Guidance can show the direction, but nobody can walk the road for you.", "Dhammapada, verse 276"],
  ["Health is the greatest gift, contentment the greatest wealth, faithfulness the best relationship.", "The things that most improve a life are rarely the things people chase.", "Dhammapada, verse 204"],
  ["As a solid rock is not shaken by the wind, so the wise are not moved by praise or blame.", "A settled mind does not rise and fall with other people's opinions.", "Dhammapada, verse 81"],
]);

author("Mahavira", "India", "c. 599-527 BCE", "https://en.wikipedia.org/wiki/Mahavira", [
  ["Non-violence is the highest religion.", "Refusing to cause harm is the most basic ethical duty.", "Traditional Jain teaching, ahimsa paramo dharma"],
  ["Live and let live.", "Allow others the same room to exist that you want for yourself.", "Attributed, Jain tradition"],
  ["All souls are equal and alike, and none is superior or inferior.", "Every living being carries the same worth, whatever its outward form.", "Attributed, Jain Agamas"],
  ["Anger begets more anger, while forgiveness and love lead to more forgiveness and love.", "Whichever response you choose tends to multiply.", "Attributed, Jain tradition"],
  ["Every soul is independent; none depends on another.", "Responsibility for your own life cannot be handed to someone else.", "Attributed, Jain Agamas"],
]);

author("Nagarjuna", "India", "c. 150-250 CE", "https://en.wikipedia.org/wiki/M%C5%ABlamadhyamakak%C4%81rik%C4%81", [
  ["Whatever is dependently arisen, that is explained to be emptiness.", "Nothing stands alone; everything exists only through its relations.", "Mulamadhyamakakarika 24.18"],
  ["There is not the slightest difference between samsara and nirvana.", "Freedom is not somewhere else; it is this same world seen correctly.", "Mulamadhyamakakarika 25.19"],
  ["Emptiness wrongly grasped is like picking up a poisonous snake by the wrong end.", "A profound idea misunderstood does more damage than no idea at all.", "Mulamadhyamakakarika 24.11"],
  ["Not from itself, not from another, not from both, nor without a cause, does anything arise.", "Simple stories about causation fall apart when examined closely.", "Mulamadhyamakakarika 1.1"],
  ["For whom emptiness is possible, everything is possible.", "Accepting that nothing is fixed is what makes change thinkable.", "Mulamadhyamakakarika 24.14"],
]);

author("Patanjali", "India", "c. 200 BCE - 400 CE", "https://en.wikisource.org/wiki/Yoga_Sutras_of_Patanjali", [
  ["Yoga is the stilling of the fluctuations of the mind.", "The practice is about quieting mental noise, not physical postures.", "Yoga Sutras 1.2"],
  ["Then the seer abides in its own true nature.", "When the mind settles, you finally see yourself as you actually are.", "Yoga Sutras 1.3"],
  ["Practice becomes firmly grounded when it is done for a long time, without interruption, and with earnestness.", "Real skill comes from long, unbroken, sincere repetition.", "Yoga Sutras 1.14"],
  ["When disturbed by negative thoughts, cultivate the opposite.", "Deliberately holding the contrary thought weakens a destructive one.", "Yoga Sutras 2.33"],
  ["Calmness of mind comes from friendliness toward the happy and compassion toward the unhappy.", "Peace of mind grows out of how you relate to other people's fortunes.", "Yoga Sutras 1.33"],
]);

author("Sri Aurobindo", "India", "1872-1950", "https://en.wikipedia.org/wiki/Sri_Aurobindo", [
  ["All life is yoga.", "Ordinary daily living, done attentively, is itself the spiritual practice.", "The Synthesis of Yoga, epigraph"],
  ["By your stumbling, the world is perfected.", "Your mistakes are part of how things move forward, not a detour from it.", "Savitri"],
  ["Man is a transitional being; he is not final.", "Human nature as it stands is a stage, not a finished result.", "The Hour of God"],
  ["Hidden nature is secret God.", "What looks like ordinary matter carries something deeper inside it.", "Thoughts and Aphorisms"],
  ["To listen to some devout people, one would imagine that God never laughs.", "Seriousness about the sacred should not squeeze the joy out of it.", "Thoughts and Aphorisms"],
]);

author("Swami Vivekananda", "India", "1863-1902", "https://en.wikisource.org/wiki/The_Complete_Works_of_Swami_Vivekananda", [
  ["Arise, awake, and stop not till the goal is reached.", "Begin, stay awake to what you are doing, and do not quit partway.", "Complete Works, motto drawn from the Katha Upanishad"],
  ["All the powers in the universe are already ours. It is we who put our hands before our eyes and cry that it is dark.", "Most of what stops us is self-imposed.", "Complete Works, Volume 1"],
  ["Take up one idea. Make that one idea your life.", "Concentrated effort on a single aim beats scattered effort on many.", "Complete Works, Volume 1"],
  ["The greatest religion is to be true to your own nature. Have faith in yourselves.", "Integrity with yourself matters more than outward observance.", "Complete Works, Volume 2"],
  ["Strength is life, weakness is death.", "What builds your capacity sustains you; what erodes it does the opposite.", "Complete Works, Volume 3"],
  ["You cannot believe in God until you believe in yourself.", "Trust in anything larger has to begin with trust in your own worth.", "Complete Works, Volume 3"],
]);

author("Rabindranath Tagore", "India", "1861-1941", "https://en.wikisource.org/wiki/Gitanjali", [
  ["Let me not pray to be sheltered from dangers, but to be fearless in facing them.", "Ask for the courage to meet difficulty rather than for a life without it.", "Fruit-Gathering"],
  ["Faith is the bird that feels the light when the dawn is still dark.", "Conviction can arrive before the evidence does.", "Fireflies"],
  ["You can't cross the sea merely by standing and staring at the water.", "Deliberation without action gets you nowhere.", "Attributed, widely cited"],
  ["The butterfly counts not months but moments, and has time enough.", "A life measured by attention rather than duration is not short.", "Fireflies"],
  ["Clouds come floating into my life, no longer to carry rain or usher storm, but to add colour to my sunset sky.", "In time, old troubles can become part of what makes a life beautiful.", "Stray Birds, verse 292"],
  ["Where the mind is without fear and the head is held high.", "The first condition of a free country is citizens who are not afraid.", "Gitanjali, poem 35"],
]);

author("Dr. Sarvepalli Radhakrishnan", "India", "1888-1975", "https://en.wikipedia.org/wiki/Sarvepalli_Radhakrishnan", [
  ["Reading a book gives us the habit of solitary reflection and true enjoyment.", "Books teach you to think alone, which is a skill in itself.", "Attributed, widely cited"],
  ["Teachers should be the best minds in the country.", "How much a society values teaching predicts what it becomes.", "Attributed, widely cited"],
  ["The true teachers are those who help us think for ourselves.", "Good teaching leaves you independent, not dependent.", "Attributed, widely cited"],
  ["It is not God that is worshipped, but the authority that claims to speak in his name.", "People often end up obeying institutions while believing they serve a principle.", "Attributed, widely cited"],
  ["Religion is not a creed but a life, not a theory but an experience.", "Belief shows up in how you live, not in what you can recite.", "Attributed, from his lectures on religion"],
]);

author("Ramana Maharshi", "India", "1879-1950", "https://en.wikipedia.org/wiki/Ramana_Maharshi", [
  ["Your own Self-realisation is the greatest service you can render the world.", "Sorting yourself out is not selfish; it is the most useful thing you can do.", "Talks with Sri Ramana Maharshi"],
  ["Happiness is your nature. It is not wrong to desire it.", "Contentment is the baseline, not a reward you have to earn.", "Talks with Sri Ramana Maharshi"],
  ["The mind is a bundle of thoughts. The thoughts arise because there is the thinker.", "Examine who is doing the worrying, not just the worries.", "Talks with Sri Ramana Maharshi"],
  ["Silence is the true teaching. It is the perfect teaching.", "Some things are conveyed by presence rather than by words.", "Talks with Sri Ramana Maharshi"],
  ["Wanting to reform the world without discovering one's true self is like trying to cover the world with leather.", "Fix your own footing rather than trying to resurface everything around you.", "Talks with Sri Ramana Maharshi"],
]);

author("Jiddu Krishnamurti", "India", "1895-1986", "https://en.wikipedia.org/wiki/Jiddu_Krishnamurti", [
  ["Truth is a pathless land.", "No method or organisation can deliver understanding to you.", "Dissolution of the Order of the Star, 1929"],
  ["The observer is the observed.", "You are not separate from the thing you are examining in yourself.", "Commentaries on Living"],
  ["To understand is to transform what is.", "Genuine understanding of a situation already begins to change it.", "The First and Last Freedom"],
  ["Freedom from the desire for an answer is essential to understanding a problem.", "Rushing to a solution stops you from seeing the problem clearly.", "The First and Last Freedom"],
  ["Tradition becomes our security, and when the mind is secure it is in decay.", "Comfortable habits of thought stop growth without announcing it.", "Freedom from the Known"],
]);

author("Mahatma Gandhi", "India", "1869-1948", "https://en.wikisource.org/wiki/Author:Mohandas_Karamchand_Gandhi", [
  ["Non-violence is the greatest force at the disposal of mankind.", "Refusing to meet force with force is itself a form of power.", "Young India, 1920"],
  ["Strength does not come from physical capacity. It comes from an indomitable will.", "Endurance is decided by resolve more than by fitness.", "Young India, 1921"],
  ["The weak can never forgive. Forgiveness is the attribute of the strong.", "Letting go of an injury takes more strength than retaliating.", "Young India, 1931"],
  ["There is more to life than increasing its speed.", "Doing things faster is not the same as doing them better.", "Attributed, widely cited"],
  ["An eye for an eye only ends up making the whole world blind.", "Reciprocal revenge has no stopping point.", "Attributed, popularised by Louis Fischer"],
]);

author("Dr. B.R. Ambedkar", "India", "1891-1956", "https://en.wikipedia.org/wiki/B._R._Ambedkar", [
  ["Educate, agitate, organise.", "Change needs knowledge, pressure and structure, in that order.", "Address to the All-India Depressed Classes Conference, 1942"],
  ["I measure the progress of a community by the degree of progress which women have achieved.", "How a society treats its women tells you how far it has actually come.", "Attributed, widely cited"],
  ["Cultivation of mind should be the ultimate aim of human existence.", "Developing your thinking is the point, not accumulating things.", "Attributed, widely cited"],
  ["Life should be great rather than long.", "Depth of a life matters more than its length.", "Attributed, widely cited"],
  ["Religion is for man and not man for religion.", "Institutions exist to serve people, not the other way round.", "Annihilation of Caste, 1936"],
]);

author("Subhas Chandra Bose", "India", "1897-1945", "https://en.wikipedia.org/wiki/Subhas_Chandra_Bose", [
  ["Give me blood, and I shall give you freedom.", "Great outcomes demand real sacrifice, not just enthusiasm.", "Speech at Burma, 1944"],
  ["Freedom is not given, it is taken.", "Rights are secured by those who claim them, not granted from above.", "Attributed, widely cited"],
  ["No real change in history has ever been achieved by discussions.", "Talk alone rarely shifts entrenched power.", "Attributed, widely cited"],
  ["One individual may die for an idea, but that idea will incarnate itself in a thousand lives.", "Ideas outlive the people who carry them.", "Attributed, widely cited"],
  ["It is our duty to pay for our liberty with our own blood.", "Freedom carries a cost that has to be borne by those who want it.", "Attributed, widely cited"],
]);

author("Dr. A.P.J. Abdul Kalam", "India", "1931-2015", "https://en.wikipedia.org/wiki/A._P._J._Abdul_Kalam", [
  ["Dream is not that which you see while sleeping, it is something that does not let you sleep.", "A real ambition keeps working on you until you act on it.", "Wings of Fire"],
  ["You have to dream before your dreams can come true.", "Nothing gets built that was not first imagined.", "Wings of Fire"],
  ["Excellence is a continuous process and not an accident.", "Consistently good work comes from habit, not luck.", "Attributed, widely cited"],
  ["If you want to shine like a sun, first burn like a sun.", "Visible success is paid for by unseen effort.", "Attributed, widely cited"],
  ["Let us sacrifice our today so that our children can have a better tomorrow.", "Some work is worth doing even when you will not see the benefit.", "Attributed, widely cited"],
]);

/* ---------------- Ancient & classical ---------------- */

author("Socrates", "Greece", "c. 470-399 BCE", "https://en.wikisource.org/wiki/Apology_(Plato)", [
  ["The unexamined life is not worth living.", "A life you never stop to question is barely your own.", "Plato, Apology 38a"],
  ["I neither know nor think that I know.", "Being clear about the limits of your knowledge is itself knowledge.", "Plato, Apology 21d"],
  ["There is only one good, knowledge, and one evil, ignorance.", "Most harm traces back to not understanding, rather than to malice.", "Diogenes Laertius, Lives of the Eminent Philosophers"],
  ["He is richest who is content with the least.", "Wealth is a ratio between what you have and what you need.", "Attributed, Diogenes Laertius"],
  ["Bad men live that they may eat and drink; good men eat and drink that they may live.", "What you treat as the point of your day reveals what you actually value.", "Attributed, Plutarch"],
]);

author("Plato", "Greece", "c. 428-348 BCE", "https://en.wikisource.org/wiki/The_Republic_of_Plato", [
  ["The beginning is the most important part of the work.", "Early choices constrain everything that follows, so get them right.", "Republic, Book II, 377a"],
  ["Our need will be the real creator.", "Necessity, more than comfort, is what drives people to invent.", "Republic, Book II, 369c"],
  ["Justice means doing one's own work and not meddling with what is not one's own.", "A community works when each part does its proper job well.", "Republic, Book IV, 433a"],
  ["The direction in which education starts a person will determine their future life.", "Early formation shapes a life more than later correction can.", "Republic, Book IV, 425b"],
  ["No law or ordinance is mightier than understanding.", "Rules cannot substitute for people who genuinely grasp why they matter.", "Laws, Book IX"],
]);

author("Aristotle", "Greece", "384-322 BCE", "https://en.wikisource.org/wiki/Nicomachean_Ethics", [
  ["We become just by doing just acts, temperate by doing temperate acts, brave by doing brave acts.", "Character is built by repeated action, not by intention.", "Nicomachean Ethics, Book II, Chapter 1"],
  ["Man is by nature a political animal.", "People are made to live in communities, not apart from them.", "Politics, Book I, Chapter 2"],
  ["Happiness is an activity of the soul in accordance with virtue.", "A good life is something you do, not something that happens to you.", "Nicomachean Ethics, Book I, Chapter 7"],
  ["It is the mark of an educated person to look for precision only so far as the subject allows.", "Knowing how exact an answer can be is part of understanding the question.", "Nicomachean Ethics, Book I, Chapter 3"],
  ["Well begun is half done.", "A careful start removes most of the difficulty from a task.", "Politics, Book V, Chapter 4, citing a proverb"],
]);

author("Confucius", "China", "551-479 BCE", "https://en.wikisource.org/wiki/The_Analects_of_Confucius", [
  ["When you know a thing, hold that you know it; when you do not know a thing, allow that you do not know it. This is knowledge.", "Honesty about your ignorance is the start of real learning.", "Analects, Book II, Chapter 17"],
  ["Learning without thought is labour lost; thought without learning is perilous.", "Facts without reflection are wasted, reflection without facts is dangerous.", "Analects, Book II, Chapter 15"],
  ["What you do not want done to yourself, do not do to others.", "Use your own preferences as the test for how to treat people.", "Analects, Book XV, Chapter 23"],
  ["The superior person is modest in speech but exceeds in action.", "Promise less than you deliver.", "Analects, Book XIV, Chapter 29"],
  ["When we see people of a contrary character, we should turn inwards and examine ourselves.", "Other people's faults are a prompt to check your own.", "Analects, Book IV, Chapter 17"],
]);

author("Laozi", "China", "c. 6th century BCE", "https://en.wikisource.org/wiki/Tao_Te_Ching", [
  ["A journey of a thousand miles begins with a single step.", "Large undertakings are only ever started in small, ordinary ways.", "Tao Te Ching, Chapter 64"],
  ["He who knows others is wise; he who knows himself is enlightened.", "Understanding yourself is harder, and worth more, than reading other people.", "Tao Te Ching, Chapter 33"],
  ["The soft overcomes the hard, and the weak overcomes the strong.", "Yielding often outlasts force.", "Tao Te Ching, Chapter 36"],
  ["He who is contented is rich.", "Sufficiency is a state of mind before it is a quantity.", "Tao Te Ching, Chapter 33"],
  ["To lead the people, one must walk behind them.", "Real authority serves rather than dominates.", "Tao Te Ching, Chapter 66"],
]);

author("Zhuangzi", "China", "c. 369-286 BCE", "https://en.wikisource.org/wiki/Zhuangzi", [
  ["I do not know whether I was a man dreaming I was a butterfly, or am now a butterfly dreaming I am a man.", "Our confidence about what is real is less solid than it feels.", "Zhuangzi, Chapter 2"],
  ["A path is made by walking on it.", "Ways forward are created by going, not found ready-made.", "Zhuangzi, Chapter 2"],
  ["Flow with whatever may happen and let your mind be free.", "Resisting every change costs more energy than adapting does.", "Zhuangzi, Inner Chapters"],
  ["The wise look into space and do not regard the small as too little, nor the great as too much.", "Perspective removes the panic from questions of scale.", "Zhuangzi, Chapter 17"],
  ["Happiness is the absence of striving for happiness.", "Chasing contentment is usually what keeps it out of reach.", "Zhuangzi, Inner Chapters"],
]);

author("Marcus Aurelius", "Roman Empire", "121-180 CE", "https://en.wikisource.org/wiki/Meditations", [
  ["The universe is change; our life is what our thoughts make it.", "You cannot fix the circumstances, but your reading of them is yours.", "Meditations, Book IV, 3"],
  ["Waste no more time arguing about what a good person should be. Be one.", "Stop theorising about virtue and practise it.", "Meditations, Book X, 16"],
  ["If you are distressed by anything external, the pain is not due to the thing itself but to your estimate of it.", "Your judgement about an event does most of the damage.", "Meditations, Book VIII, 47"],
  ["Look within. Within is the fountain of good, and it will bubble up if you dig.", "What you need is usually already available if you attend to it.", "Meditations, Book VII, 59"],
  ["The best revenge is to be unlike the one who performed the injury.", "Not becoming what harmed you is the strongest answer to it.", "Meditations, Book VI, 6"],
  ["Never value anything as profitable that compels you to break your word or lose your self-respect.", "No gain is worth what it costs you in integrity.", "Meditations, Book III, 7"],
]);

author("Seneca the Younger", "Roman Empire", "c. 4 BCE - 65 CE", "https://en.wikisource.org/wiki/Moral_letters_to_Lucilius", [
  ["We suffer more often in imagination than in reality.", "Most of what we dread never actually arrives.", "Moral Letters to Lucilius, Letter 13"],
  ["It is not that we have a short time to live, but that we waste much of it.", "Time feels scarce mainly because of how carelessly it is spent.", "On the Shortness of Life, Chapter 1"],
  ["As long as you live, keep learning how to live.", "Competence at living is never finished.", "Moral Letters to Lucilius, Letter 76"],
  ["It is a rough road that leads to the heights of greatness.", "Worthwhile achievement does not come by an easy route.", "Moral Letters to Lucilius, Letter 84"],
  ["No one is more unhappy than the person who has never met adversity, for they were never allowed to prove themselves.", "Difficulty is what lets you find out what you are capable of.", "On Providence, Chapter 4"],
]);

/* ---------------- Medieval & Islamic Golden Age ---------------- */

author("Augustine of Hippo", "Roman North Africa (present-day Algeria)", "354-430 CE", "https://en.wikisource.org/wiki/Confessions_(Augustine)", [
  ["You have made us for yourself, and our heart is restless until it rests in you.", "A certain restlessness will not settle until it finds what it is actually for.", "Confessions, Book I, Chapter 1"],
  ["What then is time? If no one asks me, I know; if I wish to explain it to one who asks, I do not know.", "Some things we handle fluently every day and still cannot define.", "Confessions, Book XI, Chapter 14"],
  ["Grant me chastity and continence, but not yet.", "We often want to reform ourselves at some comfortably later date.", "Confessions, Book VIII, Chapter 7"],
  ["The measure of love is to love without measure.", "Real affection is not rationed or calculated.", "Attributed, widely cited"],
  ["Hope has two beautiful daughters: anger at the way things are, and courage to change them.", "Hope is not passive; it produces indignation and action.", "Attributed, widely cited"],
]);

author("Thomas Aquinas", "Italy", "1225-1274", "https://en.wikisource.org/wiki/Summa_Theologiae", [
  ["Wonder is the desire for knowledge.", "Curiosity is the appetite that learning satisfies.", "Summa Theologiae, I-II"],
  ["It is better to illuminate than merely to shine, and to pass on what you have contemplated than merely to contemplate.", "Understanding something is only half done until you share it.", "Summa Theologiae, II-II, Question 188"],
  ["Law is an ordinance of reason for the common good, made by the one who has care of the community.", "Rules are legitimate when reasoned and aimed at everyone's benefit.", "Summa Theologiae, I-II, Question 90"],
  ["There is nothing on this earth more to be prized than true friendship.", "Good friends are the most valuable thing an ordinary life contains.", "Attributed, widely cited"],
  ["Beware the person of a single book.", "Someone who has read only one thing is confident in the wrong way.", "Attributed, widely cited"],
]);

author("Ibn Sina (Avicenna)", "Persia (present-day Uzbekistan and Iran)", "c. 980-1037", "https://en.wikipedia.org/wiki/Avicenna", [
  ["No knowledge is acquired save through the study of its causes.", "You have not understood something until you know why it happens.", "The Canon of Medicine, opening"],
  ["Medicine considers the human body as to the means by which it is cured and by which it is driven from health.", "A discipline is defined by the questions it is built to answer.", "The Canon of Medicine, Book I"],
  ["I prefer a short life with width to a narrow one with length.", "Depth of experience can matter more than years accumulated.", "Attributed, widely cited"],
  ["The world is divided into those who have wit and no religion, and those who have religion and no wit.", "Sharp thinking and deep conviction too rarely appear in the same person.", "Attributed, widely cited"],
  ["Wine is the friend of the wise and the enemy of the drunkard.", "The same thing helps or harms depending on the person handling it.", "Attributed, widely cited"],
]);

author("Ibn Rushd (Averroes)", "Al-Andalus (present-day Spain)", "1126-1198", "https://en.wikipedia.org/wiki/Averroes", [
  ["Truth does not contradict truth, but agrees with it and bears witness to it.", "Two genuine findings can never really be in conflict.", "The Decisive Treatise"],
  ["Philosophy is the friend and milk-sister of religion.", "Reason and faith were never meant to be rivals.", "The Decisive Treatise"],
  ["Ignorance leads to fear, fear leads to hatred, and hatred leads to violence.", "Not understanding something is where a long chain of harm begins.", "Attributed, widely cited"],
  ["Anyone who studies anatomy will increase his faith in the omnipotence of God.", "Close study of how things work can deepen wonder rather than dissolve it.", "Attributed, from his medical writings"],
  ["Knowledge is the conformity of the object and the intellect.", "To know something is for your mind to match how it actually is.", "Attributed, widely cited"],
]);

author("Jalal al-Din Muhammad Rumi", "Persia / Anatolia (present-day Afghanistan and Turkey)", "1207-1273", "https://en.wikisource.org/wiki/Masnavi_I_Ma%27navi", [
  ["Listen to the reed, how it tells a tale, complaining of separations.", "Longing for what you are cut off from is where the music starts.", "Masnavi, Book I, opening lines"],
  ["Sell your cleverness and buy bewilderment.", "Being willing not to know opens more than being sharp does.", "Masnavi, Book IV"],
  ["Yesterday I was clever, so I wanted to change the world. Today I am wise, so I am changing myself.", "Reforming yourself is the version of the project you can actually complete.", "Attributed, widely cited"],
  ["The wound is the place where the light enters you.", "Where you were broken is often where understanding gets in.", "Attributed; popularised through Coleman Barks's renderings"],
  ["Out beyond ideas of wrongdoing and rightdoing, there is a field. I will meet you there.", "Some understanding is only reachable once you drop the argument.", "Quatrain, in Coleman Barks's rendering"],
]);

/* ---------------- Early modern & Enlightenment ---------------- */

author("René Descartes", "France", "1596-1650", "https://en.wikisource.org/wiki/Discourse_on_the_Method", [
  ["I think, therefore I am.", "The one thing you cannot doubt is that there is someone doing the doubting.", "Discourse on the Method, Part IV"],
  ["It is not enough to have a good mind; the main thing is to use it well.", "Ability counts for little without the discipline to apply it.", "Discourse on the Method, Part I"],
  ["Divide each difficulty into as many parts as is feasible and necessary to resolve it.", "Break a hard problem down until each piece is solvable.", "Discourse on the Method, Part II"],
  ["The reading of all good books is like a conversation with the finest minds of past centuries.", "Books let you consult people you could never otherwise meet.", "Discourse on the Method, Part I"],
  ["Doubt is the origin of wisdom.", "Questioning what you assume is where understanding begins.", "Attributed, widely cited"],
]);

author("John Locke", "England", "1632-1704", "https://en.wikisource.org/wiki/An_Essay_Concerning_Human_Understanding", [
  ["No one's knowledge here can go beyond their experience.", "What you can know is bounded by what you have actually encountered.", "An Essay Concerning Human Understanding, Book II"],
  ["Let us then suppose the mind to be white paper, void of all characters.", "We arrive without built-in content; experience writes on us.", "An Essay Concerning Human Understanding, Book II, Chapter 1"],
  ["Every man has a property in his own person.", "You own yourself before you own anything else.", "Second Treatise of Government, Section 27"],
  ["New opinions are always suspected, and usually opposed, for no reason but that they are not already common.", "Unfamiliarity, not falsehood, is what gets most new ideas rejected.", "An Essay Concerning Human Understanding, Epistle Dedicatory"],
  ["The end of law is not to abolish or restrain, but to preserve and enlarge freedom.", "Good rules exist to widen what people can safely do.", "Second Treatise of Government, Section 57"],
]);

author("Baruch Spinoza", "Netherlands", "1632-1677", "https://en.wikisource.org/wiki/Ethics_(Spinoza)", [
  ["I have made a ceaseless effort not to ridicule, not to bewail, nor to scorn human actions, but to understand them.", "Understanding people is more useful than judging them.", "Political Treatise, Chapter 1"],
  ["All things excellent are as difficult as they are rare.", "The reason good things are uncommon is that they are hard.", "Ethics, Part V, closing line"],
  ["A free person thinks of nothing less than of death, and their wisdom is a meditation on life.", "Dwelling on the end is not the same as thinking well about living.", "Ethics, Part IV, Proposition 67"],
  ["Peace is not an absence of war; it is a virtue, a state of mind, a disposition for benevolence.", "Genuine peace is something actively maintained, not merely the lack of fighting.", "Theological-Political Treatise, Chapter 5"],
  ["People are mistaken in thinking themselves free; their opinion is made of awareness of their actions and ignorance of the causes.", "We feel free largely because we cannot see what shapes us.", "Ethics, Part II, Proposition 35, scholium"],
]);

author("Voltaire", "France", "1694-1778", "https://en.wikisource.org/wiki/Author:Voltaire", [
  ["The best is the enemy of the good.", "Holding out for perfect often costs you something perfectly workable.", "La Begueule, 1772, and Dictionnaire philosophique"],
  ["Doubt is not a pleasant condition, but certainty is absurd.", "Being uncomfortable with uncertainty is no reason to fake confidence.", "Letter to Frederick William, 1770"],
  ["Common sense is not so common.", "The obvious judgement is rarer in practice than the phrase suggests.", "Dictionnaire philosophique, entry on common sense"],
  ["It is dangerous to be right in matters where established men are wrong.", "Being correct against a consensus carries a real cost.", "The Age of Louis XIV, 1751"],
  ["Judge a person by their questions rather than their answers.", "What someone asks reveals more than what they claim to know.", "Attributed, widely cited"],
]);

author("David Hume", "Scotland", "1711-1776", "https://en.wikisource.org/wiki/A_Treatise_of_Human_Nature", [
  ["A wise person proportions their belief to the evidence.", "How strongly you hold a view should track how good the support is.", "An Enquiry Concerning Human Understanding, Section X"],
  ["Reason is, and ought only to be, the slave of the passions.", "Logic tells you how to get what you want; it cannot tell you what to want.", "A Treatise of Human Nature, Book II, Part III"],
  ["Custom is the great guide of human life.", "Most of what we do rests on habit rather than argument.", "An Enquiry Concerning Human Understanding, Section V"],
  ["Beauty is no quality in things themselves; it exists merely in the mind which contemplates them.", "Value judgements come from the observer, not the object.", "Of the Standard of Taste, 1757"],
  ["Truth springs from argument amongst friends.", "Honest disagreement between people who trust each other is productive.", "Attributed, widely cited"],
]);

author("Immanuel Kant", "Prussia (present-day Germany)", "1724-1804", "https://en.wikisource.org/wiki/Critique_of_Pure_Reason", [
  ["Enlightenment is the human being's emergence from self-imposed immaturity.", "Growing up intellectually means daring to think without a minder.", "What Is Enlightenment?, 1784"],
  ["Act only according to that maxim whereby you can at the same time will that it should become a universal law.", "Only do what you would be willing for everyone to do.", "Groundwork of the Metaphysics of Morals, 1785"],
  ["Two things fill the mind with ever new admiration: the starry heavens above me and the moral law within me.", "Wonder points both outward at the universe and inward at conscience.", "Critique of Practical Reason, conclusion"],
  ["Out of the crooked timber of humanity, no straight thing was ever made.", "Human material is flawed, so expect imperfection in anything built from it.", "Idea for a Universal History, 1784"],
  ["Thoughts without content are empty; intuitions without concepts are blind.", "Facts and frameworks are useless without each other.", "Critique of Pure Reason, A51/B75"],
]);

/* ---------------- 19th & 20th century ---------------- */

author("G.W.F. Hegel", "Germany", "1770-1831", "https://en.wikisource.org/wiki/Philosophy_of_History", [
  ["What experience and history teach is this: that nations and governments have never learned anything from history.", "The lessons of the past are noticed far more often than they are applied.", "Lectures on the Philosophy of History, Introduction"],
  ["The owl of Minerva spreads its wings only with the falling of the dusk.", "We usually understand a period only once it is over.", "Elements of the Philosophy of Right, Preface"],
  ["Nothing great in the world has been accomplished without passion.", "Detached competence alone does not produce anything remarkable.", "Lectures on the Philosophy of History"],
  ["The history of the world is none other than the progress of the consciousness of freedom.", "History is best read as an argument about who counts as free.", "Lectures on the Philosophy of History"],
  ["To be independent of public opinion is the first formal condition of achieving anything great.", "You cannot do original work while managing everyone's approval.", "Elements of the Philosophy of Right, Section 318"],
  ["Genuine tragedies are not conflicts between right and wrong, but between two rights.", "The hardest situations set two legitimate claims against each other.", "Attributed, from his lectures on aesthetics"],
]);

author("Arthur Schopenhauer", "Germany", "1788-1860", "https://en.wikisource.org/wiki/The_World_as_Will_and_Idea", [
  ["Talent hits a target no one else can hit; genius hits a target no one else can see.", "Skill solves stated problems; originality finds the unstated ones.", "The World as Will and Representation, Volume II"],
  ["Every person takes the limits of their own field of vision for the limits of the world.", "We mistake the edge of our understanding for the edge of what exists.", "Studies in Pessimism"],
  ["Compassion is the basis of morality.", "Ethics grows from feeling another's situation, not from rules alone.", "On the Basis of Morality, 1840"],
  ["A person can do what they will, but cannot will what they will.", "You choose your actions but not the desires that drive them.", "On the Freedom of the Will, 1839"],
  ["The two enemies of human happiness are pain and boredom.", "Life swings between wanting something and having nothing to want.", "The World as Will and Representation"],
  ["Change alone is eternal, perpetual, immortal.", "The one permanent feature of things is that they do not stay.", "Parerga and Paralipomena"],
]);

author("Ralph Waldo Emerson", "United States", "1803-1882", "https://en.wikisource.org/wiki/Essays:_First_Series", [
  ["A foolish consistency is the hobgoblin of little minds.", "Refusing to change your view just to seem steady is not a virtue.", "Self-Reliance, 1841"],
  ["Nothing great was ever achieved without enthusiasm.", "Sustained effort needs something more than duty behind it.", "Circles, 1841"],
  ["The only way to have a friend is to be one.", "Friendship is produced by what you offer, not what you seek.", "Friendship, 1841"],
  ["Self-trust is the first secret of success.", "You have to back your own judgement before anyone else will.", "Society and Solitude, 1870"],
  ["Every person I meet is my superior in some way, and in that I learn from them.", "Anyone can teach you something if you look for the right thing.", "Attributed, widely cited"],
  ["Do not go where the path may lead; go instead where there is no path and leave a trail.", "Original work means going where there are no instructions.", "Attributed, widely cited"],
]);

author("Søren Kierkegaard", "Denmark", "1813-1855", "https://en.wikisource.org/wiki/Author:S%C3%B8ren_Kierkegaard", [
  ["Life can only be understood backwards, but it must be lived forwards.", "Clarity arrives only after the decisions have already been made.", "Journals, 1843"],
  ["Anxiety is the dizziness of freedom.", "The unease you feel is the weight of having a real choice.", "The Concept of Anxiety, 1844"],
  ["The most common form of despair is not being who you are.", "Quiet unhappiness usually comes from living as someone else's version of you.", "The Sickness Unto Death, 1849"],
  ["Purity of heart is to will one thing.", "Integrity is wanting a single thing rather than pulling in many directions.", "Upbuilding Discourses in Various Spirits, 1847"],
  ["To dare is to lose one's footing momentarily; not to dare is to lose oneself.", "Risk costs you balance for a moment; avoidance costs you more.", "Journals"],
  ["Once you label me, you negate me.", "A category placed on a person erases most of who they are.", "Attributed, widely cited"],
]);

author("Henry David Thoreau", "United States", "1817-1862", "https://en.wikisource.org/wiki/Walden", [
  ["The mass of men lead lives of quiet desperation.", "A great many people are unhappy in ways they never voice.", "Walden, 1854"],
  ["I went to the woods because I wished to live deliberately.", "Choosing your life on purpose is different from drifting into it.", "Walden, 1854"],
  ["Simplify, simplify.", "Most complication in a life is optional.", "Walden, 1854"],
  ["It is not enough to be busy; the question is, what are we busy about?", "Activity is not the same as accomplishment.", "Letter to H.G.O. Blake, 1855"],
  ["If you have built castles in the air, your work need not be lost; now put the foundations under them.", "Ambitious ideas are not wasted; they just need groundwork.", "Walden, Conclusion"],
  ["Things do not change; we change.", "What shifts is usually your relationship to a situation, not the situation.", "Walden, 1854"],
]);

author("Karl Marx", "Germany", "1818-1883", "https://en.wikisource.org/wiki/Author:Karl_Marx", [
  ["The philosophers have only interpreted the world in various ways; the point is to change it.", "Analysis that never turns into action is incomplete.", "Theses on Feuerbach, XI, 1845"],
  ["Men make their own history, but not under circumstances of their own choosing.", "You have real agency, but always inside conditions you inherited.", "The Eighteenth Brumaire of Louis Bonaparte, 1852"],
  ["Religion is the sigh of the oppressed creature, the heart of a heartless world.", "Comfort of that kind answers a real distress, whatever you think of it.", "Critique of Hegel's Philosophy of Right, 1843"],
  ["From each according to his ability, to each according to his needs.", "Contribution measured by capacity, reward measured by necessity.", "Critique of the Gotha Programme, 1875"],
  ["Workers of the world, unite; you have nothing to lose but your chains.", "People with little to protect have the most reason to organise.", "The Communist Manifesto, 1848"],
  ["The tradition of all dead generations weighs like a nightmare on the brain of the living.", "Inherited habits of thought constrain the present more than we notice.", "The Eighteenth Brumaire of Louis Bonaparte, 1852"],
]);

author("Friedrich Nietzsche", "Germany", "1844-1900", "https://en.wikisource.org/wiki/Author:Friedrich_Nietzsche", [
  ["He who has a why to live can bear almost any how.", "Purpose makes hardship survivable.", "Twilight of the Idols, 1889"],
  ["Whoever fights monsters should see to it that he does not become a monster.", "Fighting something badly can turn you into it.", "Beyond Good and Evil, Section 146"],
  ["One must still have chaos in oneself to give birth to a dancing star.", "Inner disorder is often the raw material of something original.", "Thus Spoke Zarathustra, 1883"],
  ["There are no facts, only interpretations.", "Every account of the world arrives already framed by someone.", "Notebooks, 1886-1887"],
  ["That which does not kill me makes me stronger.", "Surviving a difficulty can leave you more capable than before.", "Twilight of the Idols, 1889"],
  ["Without music, life would be a mistake.", "Some things justify existence without needing to be useful.", "Twilight of the Idols, 1889"],
]);

author("Bertrand Russell", "United Kingdom", "1872-1970", "https://en.wikipedia.org/wiki/Bertrand_Russell", [
  ["The good life is one inspired by love and guided by knowledge.", "Care sets the direction and understanding keeps it honest.", "What I Believe, 1925"],
  ["Science is what you know, philosophy is what you don't know.", "Philosophy occupies the questions that have not yet become answerable.", "The Philosophy of Logical Atomism, 1918"],
  ["To conquer fear is the beginning of wisdom.", "Clear thinking is impossible while you are afraid.", "The Conquest of Happiness, 1930"],
  ["Do not fear to be eccentric in opinion, for every opinion now accepted was once eccentric.", "Today's consensus was yesterday's odd idea.", "Attributed, widely cited"],
  ["The time you enjoy wasting is not wasted time.", "Rest that you actually enjoy is doing its job.", "Attributed, widely cited"],
]);

author("Ludwig Wittgenstein", "Austria", "1889-1951", "https://en.wikisource.org/wiki/Tractatus_Logico-Philosophicus", [
  ["The limits of my language mean the limits of my world.", "What you cannot express marks the boundary of what you can think about.", "Tractatus Logico-Philosophicus, 5.6"],
  ["Whereof one cannot speak, thereof one must be silent.", "Some matters are better left unspoken than badly stated.", "Tractatus Logico-Philosophicus, 7"],
  ["The world is all that is the case.", "Reality is the set of facts, not the set of things.", "Tractatus Logico-Philosophicus, 1"],
  ["Philosophy is a battle against the bewitchment of our intelligence by language.", "Many hard problems are confusions produced by how we phrase them.", "Philosophical Investigations, Section 109"],
  ["If a lion could speak, we could not understand him.", "Shared words are not enough without a shared way of living.", "Philosophical Investigations, Part II"],
  ["A serious philosophical work could be written consisting entirely of jokes.", "A good joke and a good argument work the same way.", "Attributed, recorded by Norman Malcolm"],
]);

author("Martin Heidegger", "Germany", "1889-1976", "https://en.wikipedia.org/wiki/Martin_Heidegger", [
  ["Language is the house of Being.", "We do not just describe the world in language; we live inside it.", "Letter on Humanism, 1947"],
  ["The most thought-provoking thing in our thought-provoking time is that we are still not thinking.", "Being surrounded by information is not the same as reflecting.", "What Is Called Thinking?, 1954"],
  ["Making itself intelligible is suicide for philosophy.", "Some enquiry loses its point when forced into easy summary.", "Attributed, from his lectures"],
  ["Every person is born as many people and dies as a single one.", "A life narrows from many possibilities into one actual shape.", "Attributed, widely cited"],
  ["Tell me how you read and I will tell you who you are.", "How you attend to something reveals your character.", "Attributed, widely cited"],
]);

author("Jean-Paul Sartre", "France", "1905-1980", "https://en.wikipedia.org/wiki/Jean-Paul_Sartre", [
  ["Man is condemned to be free.", "You cannot escape choosing, and that is a burden as much as a gift.", "Existentialism Is a Humanism, 1946"],
  ["Existence precedes essence.", "You exist first and define what you are afterwards, by acting.", "Existentialism Is a Humanism, 1946"],
  ["Hell is other people.", "Being permanently seen and judged by others is its own torment.", "No Exit, 1944"],
  ["We are our choices.", "Identity is the sum of what you decide, not what you intend.", "Existentialism Is a Humanism, 1946"],
  ["Freedom is what you do with what has been done to you.", "Circumstances are given; the response is yours.", "Attributed, widely cited"],
]);

author("Viktor Frankl", "Austria", "1905-1997", "https://en.wikipedia.org/wiki/Viktor_Frankl", [
  ["Everything can be taken from a person but one thing: the last of the human freedoms.", "The power to choose your attitude survives almost any loss.", "Man's Search for Meaning, 1946"],
  ["When we are no longer able to change a situation, we are challenged to change ourselves.", "Where circumstances are fixed, growth is the only variable left.", "Man's Search for Meaning, 1946"],
  ["Suffering ceases to be suffering at the moment it finds a meaning.", "Pain becomes bearable when it is part of something that matters.", "Man's Search for Meaning, 1946"],
  ["What is to give light must endure burning.", "Anything that helps others costs the one who provides it.", "Attributed, widely cited"],
  ["Life is never made unbearable by circumstances, but only by lack of meaning.", "It is emptiness, not difficulty, that breaks people.", "Man's Search for Meaning, 1946"],
]);

author("Albert Camus", "France (born in Algeria)", "1913-1960", "https://en.wikipedia.org/wiki/Albert_Camus", [
  ["In the depth of winter, I finally learned that within me there lay an invincible summer.", "Something in you holds when everything outside has gone cold.", "Return to Tipasa, 1952"],
  ["One must imagine Sisyphus happy.", "Meaning can be found in the struggle itself, not only in the result.", "The Myth of Sisyphus, 1942"],
  ["Real generosity toward the future lies in giving all to the present.", "The best thing you can do for later is to work well now.", "The Rebel, 1951"],
  ["Freedom is nothing but a chance to be better.", "Liberty is an opportunity, not an achievement.", "Resistance, Rebellion, and Death, 1960"],
  ["Man is the only creature who refuses to be what he is.", "Humans are defined partly by dissatisfaction with themselves.", "The Rebel, 1951"],
]);

/* ---------------------------------------------------------------- */

export const QUOTES: readonly Quote[] = bank;

export const AUTHOR_COUNT = new Set(bank.map((q) => q.author)).size;

export { normaliseText as normalise } from "./archive";
