import enchant
import sys

def is_valid_word(word):
    try:
        dictionary = enchant.Dict("en_US")
        return dictionary.check(word)
    except Exception as e:
        print(f"Error: {e}")
        sys.exit(1)

if __name__ == "__main__":
    input_word = sys.argv[1]
    result = is_valid_word(input_word)
    print(result)