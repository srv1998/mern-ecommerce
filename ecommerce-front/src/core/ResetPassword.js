import React,{ useState } from 'react';
import Layout from './Layout';
import { Link } from 'react-router-dom';
import { resetPassword } from '../auth';;

const ResetPassword = (props) => {
    const [values, setValues] = useState({
        name: '',
        newPassword: '',
        error: '',
        message: '',
        showForm: true
    });

    const { showForm, name, newPassword, error, message } = values;

    const handleSubmit = e => {
        e.preventDefault();
        resetPassword({
            newPassword,
            resetPasswordLink: props.match.params.id
        }).then(data => {
            if (data.error) {
                setValues({ ...values, error: data.error, showForm: false, newPassword: '' });
            } else {
                setValues({ ...values, message: data.message, showForm: false, newPassword: '', error: false });
            }
        });
    };

    const passwordResetForm = () => (
        <form onSubmit={handleSubmit}>
            <div className="form-group pt-5">
                <input
                    type="password"
                    onChange={e => setValues({ ...values, newPassword: e.target.value })}
                    className="form-control"
                    value={newPassword}
                    placeholder="Type new password"
                    required
                />
            </div>
            <div>
                <button className="btn btn-primary">Change password</button>
            </div>
        </form>
    );

    const showError = () => (error ? <div className="alert alert-danger">{error}</div> : '');
    const showMessage = () => (message ? <div className="alert alert-success">{message}</div> : '');

    return (
        <Layout title="Reset Password" description="enter new password" className="container">
            <div className="container">
                <h2>Reset password</h2>
                <hr />
                {showError()}
                {showMessage()}
                {passwordResetForm()}
                <Link to="/forgot-password/page" style={{color:'red',textDecoration:'underline'}}><small>Return to forgot password page</small> </Link>
            </div>
        </Layout>
    );
};

export default ResetPassword;
