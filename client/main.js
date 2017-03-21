//Katie Steward::piQue::GEEN2400::appInitialization
//2/26/2017
//main javascript hello

import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Session } from 'meteor/session';

import './main.html';

const day = 5000;
const week = day*7;
const month = day*30;
const year = day*365;

Meteor.startup(function() {
	Session.setDefault('templateName', 'piQue');
	var d = new Date();
	var startTime = d.getTime();
	Session.setDefault('points', 0);
	Session.setDefault('weeklyPoints', 0);
	Session.setDefault('monthlyPoints', 0);
	Session.setDefault('yearlyPoints', 0);
	Session.setDefault('dayStart', startTime);
	Session.setDefault('weekStart', startTime);
	Session.setDefault('monthStart', startTime);
	Session.setDefault('yearStart', startTime);
	setTimeout(function() {
		refreshPoints();
	}, 500);
})

Template.body.helpers({
	template_name: function() {
		console.log('template_name helper');
		return Session.get('templateName');}
})

Template.history.helpers({
	points: function() {return Session.get('points');},
	weeklyPoints: function() {return Session.get('weeklyPoints');},
	monthlyPoints: function() {return Session.get('monthlyPoints');},
	yearlyPoints: function() {return Session.get('yearlyPoints');}
})

Template.history.events({
	'click button'(event, instance) {
		if (event.target.innerText == 'Back')
			Session.set('templateName', 'piQue');			
	}
})

Template.piQue.events({
	'click button'(event, instance){
		if (event.target.innerText == 'history')
			Session.set('templateName', 'history');
		else if (event.target.innerText == 'connect')
			Session.set('templateName', 'connect');
		else if (event.target.innerText == 'reset')
			Session.set('templateName', 'reset');
	}
})

Template.connect.events({  
	'click button'(event, instance) {
		if (event.target.innerText == 'Back')
			Session.set('templateName', 'piQue');
	}
})

Template.reset.events({
	'click button'(event, instance) {
		if (event.target.innerText == 'No')
			Session.set('templateName', 'piQue');
		else if (event.target.innerText == 'Yes')
		{
			Session.set('points', 0);
			Session.set('weeklyPoints', 0);
			Session.set('monthlyPoints', 0);
			Session.set('yearlyPoints', 0);
			Session.set('templateName', 'piQue');
		}
	}
})

function refreshPoints(){
	var d = new Date();
	var now = d.getTime();
	if ( now - Session.get('dayStart') > day ){
		Session.set('points', 0);
		Session.set('dayStart', now);
	}
	if ( now - Session.get('weekStart') > week ){
		Session.set('weeklyPoints', 0);
		Session.set('weekStart', now);
	}
	if ( now - Session.get('monthStart') > month ){
		Session.set('monthlyPoints', 0);
		Session.set('monthStart', now);
	}
	if ( now - Session.get('yearStart') > year ){
		Session.set('yearlyPoints', 0);
		Session.set('yearStart', now);
	}
	Session.set('points', Session.get('points') + 1);
	Session.set('weeklyPoints', Session.get('weeklyPoints') + 1);
	Session.set('monthlyPoints', Session.get('monthlyPoints') + 1);
	Session.set('yearlyPoints', Session.get('yearlyPoints') + 1);
	setTimeout(function() {
		refreshPoints();
	}, 500);
	//console.log('refreshPoints ' + Session.get('points'));
}
