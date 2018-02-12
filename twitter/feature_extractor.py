import re


# takes in a tweet and returns features
class tweatures:
	def __init__(self):
		pass
		# self.cap=self.isCap(tweet)
		# self.wordcap=self.isWordCap(tweet)

	def isCap(self,tweet):
		return Bool(re.match("^[A-Z]",tweet))


	def isWordCap(self,tweet):
		return True

	def styleWords(self,tweet):
		presentWords = []
		words = ["cool","init"]
		splitTweet = tweet.lower().split()
		for word in words:
			if word in splitTweet:
				presentWords.append(word)
		return presentWords

tweet = "hello Cool"

print(tweatures().isCap(tweet))
print(tweatures().styleWords(tweet))