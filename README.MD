# JCC Portfolio

## Requirements
- NodeJS
- Yarn
- Ruby (optional)

## Basic Setup
- Run `yarn install` 
- Run required packages `yarn global add eslint; yarn global add prettier`
- Optional: If you have ruby, run the following either: 
	- `cd && gem install --no-ri --no-rdoc bundler`
	- `gem install bundler -v $(grep -A 1 "BUNDLED WITH" Gemfile.lock | tail -n 1) --no-document --conservative`
	- Then test the following if exist(s): 
		- `bundle install`
		- `which bundler`
		- `which sass`

## Required TODOs
- For HTML tests (Homepage): Run `gulp homepage`
- To generate CSS from SASS: Run `gulp csass`
