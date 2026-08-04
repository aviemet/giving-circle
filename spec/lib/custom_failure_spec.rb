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
    allow(failure).to receive_messages(request: request, http_auth_header?: true, http_auth_body: "denied")

    failure.http_auth

    expect(failure.status).to eq(200)
    expect(failure.response_body).to eq(["denied"])
  end

  it "covers recall without relative url root" do
    failure = described_class.new
    env = Rack::MockRequest.env_for("/users/sign_in", method: "POST")
    request = ActionDispatch::Request.new(env)
    failure.instance_variable_set(:@request, request)
    recalled = [200, {}, ["ok"]]
    allow(failure).to receive_messages(request: request, warden_options: { recall: "users/sessions#create" }, attempted_path: "/users/sign_in", relative_url_root?: false, is_flashing_format?: true, i18n_message: "Invalid", recall_app: ->(_env) { recalled })

    failure.recall

    expect(failure.response).to eq(recalled)
  end

  it "covers recall with relative url root" do
    failure = described_class.new
    env = Rack::MockRequest.env_for("/app/users/sign_in", method: "POST")
    request = ActionDispatch::Request.new(env)
    failure.instance_variable_set(:@request, request)
    recalled = [200, {}, ["ok"]]
    allow(failure).to receive_messages(request: request, warden_options: { recall: "users/sessions#create" }, attempted_path: "/app/users/sign_in", relative_url_root?: true, relative_url_root: "/app", is_flashing_format?: false, recall_app: ->(_env) { recalled })

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
    allow(failure).to receive(:redirect_to)
    flash = ActionDispatch::Flash::FlashHash.new
    failure.respond_to_failure_types
    expect(failure).to have_received(:redirect_to).with("/login")

    failure = described_class.new
    failure.instance_variable_set(:@request, request)
    failure.instance_variable_set(:@_response, response)
    allow(failure).to receive(:request).and_return(request)
    allow(failure).to receive(:warden_message).and_return(:unconfirmed)
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
    allow(failure).to receive_messages(i18n_message: "Invalid", flash: flash, params: { user: { email: "a@example.com" } }, headers: headers)
    failure.respond_to_failure_types
    expect(headers["x-inertia"]).to be(true)
  end

  it "covers redirect flash handling" do
    failure = described_class.new
    env = Rack::MockRequest.env_for("/login", method: "GET", "HTTP_HOST" => "www.example.com")
    request = ActionDispatch::Request.new(env)
    response = ActionDispatch::Response.new
    failure.instance_variable_set(:@request, request)
    failure.instance_variable_set(:@_response, response)
    allow(failure).to receive(:store_location!)
    allow(failure).to receive(:redirect_to)
    flash = ActionDispatch::Flash::FlashHash.new
    allow(failure).to receive_messages(request: request, is_flashing_format?: true, i18n_message: "Please sign in", redirect_url: "/login", flash: flash)

    failure.redirect
    expect(failure).to have_received(:redirect_to).with("/login")

    flash[:timedout] = true
    flash[:alert] = "still"
    failure.redirect
    expect(failure).to have_received(:redirect_to).with("/login").twice
  end
end
