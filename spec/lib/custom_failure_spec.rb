require "rails_helper"

RSpec.describe CustomFailure, type: :request do
  it "redirects invalid credentials through the failure app" do
    post user_session_path, params: { user: { email: "nobody@example.com", password: "wrong" } }

    expect(response).to have_http_status(:ok).or redirect_to("/login")
  end

  it "redirects unauthenticated html requests to sign in" do
    get users_path

    expect(response).to redirect_to("/login")
  end

  it "covers http_auth response body helpers" do
    failure = described_class.new
    env = Rack::MockRequest.env_for("/users/sign_in", method: "POST")
    request = ActionDispatch::Request.new(env)
    response = ActionDispatch::Response.new
    failure.instance_variable_set(:@request, request)
    failure.instance_variable_set(:@_response, response)
    allow(failure).to receive(:request).and_return(request)
    allow(failure).to receive(:http_auth_header?).and_return(true)
    allow(failure).to receive(:http_auth_body).and_return("denied")

    failure.http_auth

    expect(failure.status).to eq(200)
    expect(failure.response_body).to eq(["denied"])
  end

  it "covers recall without relative url root" do
    failure = described_class.new
    env = Rack::MockRequest.env_for("/users/sign_in", method: "POST")
    request = ActionDispatch::Request.new(env)
    failure.instance_variable_set(:@request, request)
    allow(failure).to receive(:request).and_return(request)
    allow(failure).to receive(:warden_options).and_return({ recall: "users/sessions#create" })
    allow(failure).to receive(:attempted_path).and_return("/users/sign_in")
    allow(failure).to receive(:relative_url_root?).and_return(false)
    allow(failure).to receive(:is_flashing_format?).and_return(true)
    allow(failure).to receive(:i18n_message).and_return("Invalid")
    recalled = [200, {}, ["ok"]]
    allow(failure).to receive(:recall_app).and_return(->(_env) { recalled })

    failure.recall

    expect(failure.response).to eq(recalled)
  end

  it "covers recall with relative url root" do
    failure = described_class.new
    env = Rack::MockRequest.env_for("/app/users/sign_in", method: "POST")
    request = ActionDispatch::Request.new(env)
    failure.instance_variable_set(:@request, request)
    allow(failure).to receive(:request).and_return(request)
    allow(failure).to receive(:warden_options).and_return({ recall: "users/sessions#create" })
    allow(failure).to receive(:attempted_path).and_return("/app/users/sign_in")
    allow(failure).to receive(:relative_url_root?).and_return(true)
    allow(failure).to receive(:relative_url_root).and_return("/app")
    allow(failure).to receive(:is_flashing_format?).and_return(false)
    recalled = [200, {}, ["ok"]]
    allow(failure).to receive(:recall_app).and_return(->(_env) { recalled })

    failure.recall

    expect(failure.response).to eq(recalled)
  end

  it "covers respond branches" do
    failure = described_class.new
    allow(failure).to receive(:http_auth?).and_return(true)
    allow(failure).to receive(:respond_to_failure_types)
    failure.respond
    expect(failure).to have_received(:respond_to_failure_types)

    failure = described_class.new
    allow(failure).to receive(:http_auth?).and_return(false)
    allow(failure).to receive(:warden_options).and_return({ recall: "users/sessions#create" })
    allow(failure).to receive(:recall)
    failure.respond
    expect(failure).to have_received(:recall)

    failure = described_class.new
    allow(failure).to receive(:http_auth?).and_return(false)
    allow(failure).to receive(:warden_options).and_return({})
    allow(failure).to receive(:redirect)
    failure.respond
    expect(failure).to have_received(:redirect)
  end

  it "covers respond_to_failure_types messages" do
    env = Rack::MockRequest.env_for("/login", method: "POST", "HTTP_HOST" => "www.example.com")
    request = ActionDispatch::Request.new(env)
    response = ActionDispatch::Response.new

    failure = described_class.new
    failure.instance_variable_set(:@request, request)
    failure.instance_variable_set(:@_response, response)
    allow(failure).to receive(:request).and_return(request)
    allow(failure).to receive(:warden_message).and_return(:invalid)
    allow(failure).to receive(:i18n_message).and_return("Invalid")
    allow(failure).to receive(:redirect_to)
    flash = ActionDispatch::Flash::FlashHash.new
    allow(failure).to receive(:flash).and_return(flash)
    failure.respond_to_failure_types
    expect(failure).to have_received(:redirect_to).with("/login")

    failure = described_class.new
    failure.instance_variable_set(:@request, request)
    failure.instance_variable_set(:@_response, response)
    allow(failure).to receive(:request).and_return(request)
    allow(failure).to receive(:warden_message).and_return(:unconfirmed)
    allow(failure).to receive(:params).and_return({ user: { email: "a@example.com" } })
    allow(failure).to receive(:redirect_to)
    failure.respond_to_failure_types
    expect(failure).to have_received(:redirect_to)

    failure = described_class.new
    failure.instance_variable_set(:@request, request)
    failure.instance_variable_set(:@_response, response)
    allow(failure).to receive(:request).and_return(request)
    allow(failure).to receive(:warden_message).and_return(:unauthenticated)
    allow(failure).to receive(:redirect_to)
    headers = {}
    allow(failure).to receive(:headers).and_return(headers)
    failure.respond_to_failure_types
    expect(headers["x-inertia"]).to eq(true)
  end

  it "covers redirect flash handling" do
    failure = described_class.new
    env = Rack::MockRequest.env_for("/login", method: "GET", "HTTP_HOST" => "www.example.com")
    request = ActionDispatch::Request.new(env)
    response = ActionDispatch::Response.new
    failure.instance_variable_set(:@request, request)
    failure.instance_variable_set(:@_response, response)
    allow(failure).to receive(:request).and_return(request)
    allow(failure).to receive(:store_location!)
    allow(failure).to receive(:is_flashing_format?).and_return(true)
    allow(failure).to receive(:i18n_message).and_return("Please sign in")
    allow(failure).to receive(:redirect_url).and_return("/login")
    allow(failure).to receive(:redirect_to)
    flash = ActionDispatch::Flash::FlashHash.new
    allow(failure).to receive(:flash).and_return(flash)

    failure.redirect
    expect(failure).to have_received(:redirect_to).with("/login")

    flash[:timedout] = true
    flash[:alert] = "still"
    failure.redirect
    expect(failure).to have_received(:redirect_to).with("/login").twice
  end
end
