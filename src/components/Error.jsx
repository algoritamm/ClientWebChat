import React from "react";

class Error extends React.Component{
    state = { hasError : false };

    static getDerivedStateFromError() {
        return { hasError : true }
    };

    componentDidCatch(error, info) {
        console.log(error, info);
    }

    render() {
        if(this.state.hasError) {
            const errorMessage = typeof this.props.fallback === 'string' ? this.props.fallback : 'An unexpected error occurred.';

            return <p>{errorMessage}</p>;
        }

        return this.props.children;
    }
    
}

export default Error;