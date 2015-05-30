'use strict';

angular.module('jrnyApp').controller('QuotesCtrl', function ($scope) {


    $scope.quotes = [
        {
            quote: 'Life is a journey, not a destination.',
            author: 'Ralph Waldo Emerson',
        },
        {
            quote: "Sometimes it's the journey that teaches you a lot about your destination.",
            author: 'Drake',
        },
        {
            quote: "It is good to have an end to journey toward; but it is the journey that matters, in the end.",
            author: "Ernest Hemingway"
        },
        {
            quote: "The most important reason for going from one place to another is to see what's in between, and they took great pleasure in doing just that.",
            author: "Norton Juster, The Phantom Tollbooth"
        },
        {
            quote: "Sometimes, reaching out and taking someone's hand is the beginning of a journey. At other times it is allowing another to take yours.",
            author: "Vera Narazian"
        },
        {
            quote: "The world is a book and those who do not travel read only one page.",
            author: "St. Augustine"
        },
        {
            quote: "Our battered suitcases were piled on the sidewalk again; we had longer ways to go. But no matter, the road is life.",
            author: "Jack Kerouac"
        },
        {
            quote: "He who does not travel does not know the value of men.",
            author: "Moorish proverb"
        },
        {
            quote: "No one realizes how beautiful it is to travel until he comes home and rests his head on his old, familiar pillow.",
            author: "Lin Yutang"
        },
        {
            quote: "All travel has its advantages. If the passenger visits better countries, he may learn to improve his own. And if fortune carries him to worse, he may learn to enjoy it.",
            author: "Samuel Johnson"
        },
        {
            quote: "One’s destination is never a place, but a new way of seeing things.",
            author: "Henry Miller"
        },
        {
            quote: "A traveler without observation is a bird without wings.",
            author: "Moslih Eddin Saadi"
        },
        {
            quote: "Twenty years from now you will be more disappointed by the things you didn’t do than by the ones you did do. So throw off the bowlines, sail away from the safe harbor. Catch the trade winds in your sails. Explore. Dream. Discover.",
            author: "Mark Twain"
        },
        {
            quote: "Travel is more than the seeing of sights; it is a change that goes on, deep and permanent, in the ideas of living.",
            author: "Miriam Beard"
        },
        {
            quote: "All journeys have secret destinations of which the traveler is unaware.",
            author: "Martin Buber"
        },
        {
            quote: "We live in a wonderful world that is full of beauty, charm and adventure. There is no end to the adventures we can have if only we seek them with our eyes open.",
            author: "Jawaharial Nehru"
        },
        {
            quote: "Tourists don’t know where they’ve been, travelers don’t know where they’re going.",
            author: "Paul Theroux"
        },
        {
            quote: "To my mind, the greatest reward and luxury of travel is to be able to experience everyday things as if for the first time, to be in a position in which almost nothing is so familiar it is taken for granted.",
            author: "Bill Bryson"
        },
        {
            quote: "Do not follow where the path may lead. Go instead where there is no path and leave a trail.",
            author: "Ralph Waldo Emerson"
        },
        {
            quote: "A journey of a thousand miles must begin with a single step.",
            author: "Lao Tzu"
        },
        {
            quote: "A good traveler has no fixed plans and is not intent on arriving.",
            author: "Lao Tzu"
        },
        {
            quote: "A journey is best measured in friends, rather than miles.",
            author: "Tim Cahill"
        },
        {
            quote: "I have found out that there ain’t no surer way to find out whether you like people or hate them than to travel with them.",
            author: "Mark Twain"
        },
        {
            quote: "Once you have traveled, the voyage never ends, but is played out over and over again in the quietest chambers. The mind can never break off from the journey.",
            author: "Pat Conroy"
        },
        {
            quote: "Not all those who wander are lost.",
            author: "J. R. R. Tolkien"
        },
        {
            quote: "Like all great travelers, I have seen more than I remember, and remember more than I have seen.",
            author: "Benjamin Disraeli"
        },
        {
            quote: "Perhaps travel cannot prevent bigotry, but by demonstrating that all peoples cry, laugh, eat, worry, and die, it can introduce the idea that if we try and understand each other, we may even become friends.",
            author: "Maya Angelou"
        },
        {
            quote: "Wandering re-establishes the original harmony which once existed between man and the universe.",
            author: "Anatole France"
        },
        {
            quote: "Travel and change of place impart new vigor to the mind.",
            author: "Seneca"
        },
        {
            quote: "I soon realized that no journey carries one far unless, as it extends into the world around us, it goes an equal distance into the world within.",
            author: "Lillian Smith"
        },
        {
            quote: "To travel is to discover that everyone is wrong about other countries.",
            author: "Aldous Huxley"
        }

]

    $scope.randomQuote = $scope.quotes[Math.floor(Math.random() * $scope.quotes.length)];


});