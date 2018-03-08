$(document).ready(function(){
	$('.deleteBtn').on('click', deleteUser);
});

function deleteUser(){
	var confirmed = confirm('Are you sure to delete this user?');
	if(confirmed){
		$.ajax({
			type: 'DELETE',
			url: 'users/delete/'+ $(this).data('id')
		}).done(function(response){
			window.location.replace('/');
		});
		window.location.replace('/');
	}else{
		return false;
	}
}