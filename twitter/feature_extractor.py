import re
import json
import csv


# takes in a tweet and returns features
class tweatures:
	def __init__(self):
		print("CREATING TWEATURE OBJECT")

		self.path = "/Users/reuben/Downloads/data/"
		self.tweets_file = "twitter-2017-04-04-2200.txt"
		self.tweets = self.tweet_generator()
		self.is_valid_tweet = lambda json_tweet : "lang" in json_tweet and json_tweet["lang"]=='en'


		self.style_words = "y u tho cus cuz woke hella dope thic thicc bro cray cuck libtard millennial millenials lit turnt bae libs dems republicans fire shook".split(" ")

		self.style_hashtags = "fitspo draintheswamp buildthewall LoveIsLove RedPill Squad".split(" ")

	# generator of tweets, which are dictionaries of full tweet text, and list of tweet hashtags
	def tweet_generator(self):
		for i,line in enumerate(open(self.path+self.tweets_file,'r')):
			if i%2==0:
				json_tweet = json.loads(line)
				if self.is_valid_tweet(json_tweet):
					yield {"text":json_tweet['text'],"hashtags": [x["text"] for x in json_tweet["entities"]["hashtags"]]}
			if i > 100:
				break


	def isCap(self,text):
		return bool(re.match("^[A-Z]",text))


	def isWordCap(self,text):
		return True

	def sentence_final_punctuation(self,text):
		pass

	def lexical_indicator(self,tweet,word):
		return word in tweet["text"].lower().split()

	def hashtag_indicator(self,tweet,hashtag):
		return hashtag in tweet["hashtags"]

	def double_punctuation(self,text):
		return Bool(re.match("\!\!|\?\?"),text)

	def save_to_csv(self):
		
		with open('twitter_data.csv', 'w', newline='') as csvfile:
			tweetwriter = csv.writer(csvfile, delimiter=' ', quotechar='|', quoting=csv.QUOTE_MINIMAL)
			tweetwriter.writerow(['#'+x for x in self.style_hashtags]+self.style_words)
			counter = 0
			for i,tweet in enumerate(self.tweets):

				row = [self.hashtag_indicator(tweet,hashtag) for hashtag in self.style_hashtags]+\
					[self.lexical_indicator(tweet,word) for word in self.style_words]
				tweetwriter.writerow(row)
				if (True in row): counter+=1
				if i%1000==0:
					print("NOW ON TWEET",str(i))

			print("COUNTER",counter)




tw = tweatures()
tw.save_to_csv()