require 'rails_helper'
require_relative '../../support/devise'

RSpec.describe "/presentation/votes", type: :request do

  # This should return the minimal set of attributes required to create a valid
  # Presentation::Vote. As you add validations to Presentation::Vote, be sure to
  # adjust the attributes here as well.
  let(:valid_attributes) {
    skip("Add a hash of attributes valid for your model")
  }

  let(:invalid_attributes) {
    skip("Add a hash of attributes invalid for your model")
  }

  describe "GET /index" do
    it "renders a successful response" do
      Presentation::Vote.create! valid_attributes
      get presentation_votes_url
      expect(response).to be_successful
    end
  end

  describe "GET /show" do
    it "renders a successful response" do
      vote = Presentation::Vote.create! valid_attributes
      get presentation_vote_url(vote)
      expect(response).to be_successful
    end
  end

  describe "GET /new" do
    it "renders a successful response" do
      get new_presentation_vote_url
      expect(response).to be_successful
    end
  end

  describe "GET /edit" do
    it "renders a successful response" do
      vote = Presentation::Vote.create! valid_attributes
      get edit_presentation_vote_url(vote)
      expect(response).to be_successful
    end
  end

  describe "POST /create" do
    context "with valid parameters" do
      it "creates a new Presentation::Vote" do
        expect {
          post presentation_votes_url, params: { presentation_vote: valid_attributes }
        }.to change(Presentation::Vote, :count).by(1)
      end

      it "redirects to the created presentation_vote" do
        post presentation_votes_url, params: { presentation_vote: valid_attributes }
        expect(response).to redirect_to(presentation_vote_url(Presentation::Vote.last))
      end
    end

    context "with invalid parameters" do
      it "does not create a new Presentation::Vote" do
        expect {
          post presentation_votes_url, params: { presentation_vote: invalid_attributes }
        }.not_to change(Presentation::Vote, :count)
      end

      it "renders a response with 422 status (i.e. to display the 'new' template)" do
        post presentation_votes_url, params: { presentation_vote: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "PATCH /update" do
    context "with valid parameters" do
      let(:new_attributes) {
        skip("Add a hash of attributes valid for your model")
      }

      it "updates the requested presentation_vote" do
        vote = Presentation::Vote.create! valid_attributes
        patch presentation_vote_url(vote), params: { presentation_vote: new_attributes }
        vote.reload
        skip("Add assertions for updated state")
      end

      it "redirects to the presentation_vote" do
        vote = Presentation::Vote.create! valid_attributes
        patch presentation_vote_url(vote), params: { presentation_vote: new_attributes }
        vote.reload
        expect(response).to redirect_to(presentation_vote_url(vote))
      end
    end

    context "with invalid parameters" do
      it "renders a response with 422 status (i.e. to display the 'edit' template)" do
        vote = Presentation::Vote.create! valid_attributes
        patch presentation_vote_url(vote), params: { presentation_vote: invalid_attributes }
        expect(response).to have_http_status(:unprocessable_entity)
      end
    end
  end

  describe "DELETE /destroy" do
    it "destroys the requested presentation_vote" do
      vote = Presentation::Vote.create! valid_attributes
      expect {
        delete presentation_vote_url(vote)
      }.to change(Presentation::Vote, :count).by(-1)
    end

    it "redirects to the presentation_votes list" do
      vote = Presentation::Vote.create! valid_attributes
      delete presentation_vote_url(vote)
      expect(response).to redirect_to(presentation_votes_url)
    end
  end
end
