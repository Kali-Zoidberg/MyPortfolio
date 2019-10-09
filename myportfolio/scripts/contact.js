
function handleMessageSuccess(res, xhr)
{
	let resultMessage = res.message;
	let messageDiv = document.getElementById("contactRes");
	if (res.status == 200) {
		if (res.resultCode == 21) {
			messageDiv.innerText = res.message;
		} else //if (res.resultCode == 20)
		{
			messageDiv.innerText = "You have sent too many messages in a short period of time.\n Please wait 5 minutes before sending another message.";
		}
	}
	else
	{
		//Could not process message.
		messageDiv.innerText = "Could not process message.";
	}
	
}

function handleMessageError(res, xhr)
{
	let messageDiv = document.getElementById("contactRes");

	messageDiv.innerText = "Error processing request: " + res.message;
}

function sendMessage()
{
	
	// Overwrite the default submit behaviour of the HTML Form

	$("form").submit(function (event) {
			event.preventDefault(); // Prevent the default form submit event, using ajax instead
			
			//.selects a tag by it's constant name
			
			//Extract data
			let name = $(".name").val();
			let email = $(".email").val();
			let otherContact = $(".otherContact").val();
			let company = $(".company").val();
			let message = $("message").val();
			
			//Create dictionary for json conversion	
			let messageModel = {"firstname": firstname, lastname: "lastname", company: "company", "message": message};
	//debugger;
			console.log("extracted data. Sending POST REQUEST");
			$.ajax({
				method: "POST", // Declare request type
				url: "http://127.0.0.1:6914/message/contact",
				dataType: "json",
				contentType: "application/json",
				data: JSON.stringify(messageModel),
				responseType: 'application/json',
				headers: {'Access-Control-Allow-Origin': "*"},
				success: handleMessageSuccess, // Bind event handler as a success callback
				error: handleMessageError
			});
		}
	);
}
