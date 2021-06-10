
import random as rd

possibleAnswer = ['Yes na - sure thing.', 'E be like so.', 'E choke!', 'E no too clear, try again.', 'Omo I dey rest, come back later.', 'Better make I no tell you now.', 'My sources say no.', 'Result no too pure.', 'Nothing like that.', 'Me sef no know o' ]


#Collect data from user's input
input_name = input('Fill in your name please: ')
question = input('Enter your question please: ')
answer = ' '

#Generating random number and assigning answer
random_number = rd.randint(1, 10)
if random_number in range(1, 11):
    answer = possibleAnswer[random_number - 1]
else:
    answer = 'Error'
#print(answer, random_number)


#Check that name exist else output "Question"
if len(input_name.strip()) == 0:
    name = ['Question:', '']
else:
    #Capitalize the first letter of name
    nameSplit = input_name.split()
    nameCaps = [nameCap.capitalize() for nameCap in nameSplit]
    
    name = ''
    for i in nameCaps:
        name += i + ' '
    
    name = [name.rstrip(), 'asks: ']
    #name = [input_name.title(), 'asks: ']


#if len(question.strip()) == 0:
#    raise Exception("Please provide a question")

#Check that a question was asked
while len(question.strip()) == 0:
    print()
    question = input("Please provide a question: ")


print('\n')
print(name[0], name[1] + question)
print("Magic Box's answer:", answer)





