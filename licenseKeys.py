import string

def formatLicenceKey(s, k):
	# Convert the string to uppercase
	s = s.upper()
	# Remove all the hyphens
	s = s.replace('-','')
	# Get length
	length = len(s)
	solution = ''
	# calculate the length of first group
	first_len = length % k
	# Find the first group
	solution += s[:first_len]
	# Write down the remaining groups
	for i in xrange(first_len,length,k):
		if solution != '':
			solution += "-"
		solution += s[i:i+k]
	# return the formatted string.
	print solution
	return solution

def test():
	assert formatLicenceKey("2-4A0r7-4k", 4) == "24A0-R74K"
