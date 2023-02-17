message = ""
counter = 1
for i in range(3):
    message += "<tr>\n"
    for j in range(9): 
        if counter > 18: #hybrid nodes
            message += (f'\t<td><button class="other" (click)="nodeSelect({counter})" [ngClass]="getNodeClass({counter})">{counter}</button></td>\n')
        elif (counter == 2 or counter == 5 or counter == 8 or counter == counter == 11 or counter == 14 or counter == 17): #cube
            message += (f'\t<td><button class="cube" (click)="nodeSelect({counter})" [ngClass]="getNodeClass({counter})">{counter}</button></td>\n')
        else: #cone
            message += (f'\t<td><button class="cone" (click)="nodeSelect({counter})" [ngClass]="getNodeClass({counter})">{counter}</button></td>\n')
        counter += 1
    message += "</tr>\n"

print(message)