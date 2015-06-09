'use strict';

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var crypto = require('crypto');
var authTypes = ['github', 'twitter', 'facebook', 'google'];

var TravelerSurveySchema = new Schema({
	traveler: String,
	local: String,
	basic: {
		arrival_date: Date,
		departure_date : Date,
		how_get: String,
		how_already_booked: String,
		where_stay: String,
		arrive_after: String,
		depart_before: String,
		where_already_booked: String
	},
	companion: {
		how_many_group: Number,
		who_travel_with: String,
		main_purpose: String,
		group_dynamic: String,
		desired_energy_level: String,
		group_limitation: String,
		travel_companions: String
	},
	interest: {
		food_drink: String,
		sightseeing: String,
		budget: String,
		must_see_do: String,
		nightlife: String,
		outdoors: String,
		live_events: String,
		overall_vibe: String
	},
	isaccept: String

    
});

module.exports = mongoose.model('TravelerSurvey', TravelerSurveySchema);
