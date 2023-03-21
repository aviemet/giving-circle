declare namespace Schema {
	interface PublicActivityActivity {
		id: number;
		trackable_type?: string;
		trackable_id?: number;
		owner_type?: string;
		owner_id?: number;
		key?: string;
		parameters?: string;
		recipient_type?: string;
		recipient_id?: number;
		created_at: string;
		updated_at: string;
	}

	interface User {
		id: number;
		email: string;
		password?: string;
		reset_password_token?: string;
		reset_password_sent_at?: string;
		remember_created_at?: string;
		created_at: string;
		updated_at: string;
	}


}
